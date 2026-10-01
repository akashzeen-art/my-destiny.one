import type { PalmAnalysisResult } from "./apiService";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY?.trim() || "";

const OPENAI_BASE_URL =
  import.meta.env.VITE_OPENAI_BASE_URL?.trim() || "https://api.openai.com";

export function isOpenAIConfigured(): boolean {
  return true;
}

function openaiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${OPENAI_BASE_URL}${p}`;
}

function openaiHeaders(json = true): HeadersInit {
  const headers: Record<string, string> = {};
  if (json) headers["Content-Type"] = "application/json";
  headers.Authorization = `Bearer ${OPENAI_API_KEY}`;
  return headers;
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

function parseJsonFromContent(content: string): Record<string, unknown> {
  let text = content.trim();
  if (text.startsWith("```")) {
    const start = text.indexOf("\n");
    const end = text.lastIndexOf("```");
    if (start >= 0 && end > start) {
      text = text.slice(start + 1, end).trim();
    }
  }
  if (text.includes("```json")) {
    text = text.slice(text.indexOf("```json") + 7);
    text = text.slice(0, text.lastIndexOf("```")).trim();
  }
  return JSON.parse(text) as Record<string, unknown>;
}

async function chatCompletion(
  messages: Array<{ role: string; content: string | Array<Record<string, unknown>> }>,
  maxTokens = 4000,
): Promise<string> {
  const response = await fetch(openaiUrl("/v1/chat/completions"), {
    method: "POST",
    headers: openaiHeaders(true),
    body: JSON.stringify({
      model: import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini",
      max_tokens: maxTokens,
      messages,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errMsg =
      (data as { error?: { message?: string } })?.error?.message ||
      `OpenAI API error ${response.status}`;
    throw new Error(errMsg);
  }

  const content = (data as { choices?: Array<{ message?: { content?: string } }> })
    ?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from OpenAI");
  }

  return content;
}

const PALM_PROMPT = `Analyze this palm image and provide a detailed palm reading.
Return ONLY raw valid JSON — no markdown, no code blocks, no explanation.
Use EXACTLY this JSON structure with all fields filled with real analysis:
{
  "overallScore": 85,
  "summary": "2-3 sentence summary based on the actual palm.",
  "lines": {
    "lifeLine": {"quality": "Strong", "score": 88, "meaning": "Short meaning", "details": "Detailed interpretation"},
    "headLine": {"quality": "Clear", "score": 82, "meaning": "Short meaning", "details": "Detailed interpretation"},
    "heartLine": {"quality": "Curved", "score": 79, "meaning": "Short meaning", "details": "Detailed interpretation"},
    "fateLine": {"quality": "Present", "score": 74, "meaning": "Short meaning", "details": "Detailed interpretation"}
  },
  "personality": {
    "dominantHand": "Right",
    "palmShape": "Square",
    "fingerLength": "Balanced",
    "handType": "Earth",
    "handTypeAnalysis": "2-3 sentences about this hand type.",
    "traits": [
      {"name": "Leadership", "score": 90, "description": "Natural ability to guide others."},
      {"name": "Creativity", "score": 85, "description": "Strong artistic tendencies."},
      {"name": "Intuition", "score": 80, "description": "Excellent gut feelings."},
      {"name": "Determination", "score": 92, "description": "Persistent and goal-oriented."}
    ]
  },
  "predictions": [
    {"area": "Career", "timeframe": "Next 6 months", "prediction": "Career prediction.", "confidence": 85, "advice": "Actionable advice."},
    {"area": "Relationships", "timeframe": "Next 3 months", "prediction": "Relationship prediction.", "confidence": 78, "advice": "Actionable advice."},
    {"area": "Health", "timeframe": "Ongoing", "prediction": "Health prediction.", "confidence": 90, "advice": "Actionable advice."},
    {"area": "Finances", "timeframe": "Next year", "prediction": "Finance prediction.", "confidence": 75, "advice": "Actionable advice."}
  ],
  "specialMarks": [
    {"name": "Mark name", "location": "Location on palm", "meaning": "What it means.", "significance": "High"}
  ],
  "compatibility": [
    {"type": "Earth Hands", "match": 92, "description": "Description."},
    {"type": "Fire Hands", "match": 85, "description": "Description."},
    {"type": "Air Hands", "match": 80, "description": "Description."}
  ],
  "accuracy": {"lineDetection": 0.95, "patternAnalysis": 0.92, "interpretation": 0.90, "overall": 0.92}
}
Replace ALL placeholder values with REAL analysis from the actual palm image.`;

function normalizePalmResult(raw: Record<string, unknown>): PalmAnalysisResult {
  const accuracy = (raw.accuracy as PalmAnalysisResult["accuracy"]) || {
    lineDetection: 0.92,
    patternAnalysis: 0.9,
    interpretation: 0.88,
    overall: 0.9,
  };

  return {
    ...(raw as unknown as PalmAnalysisResult),
    overallScore: Number(raw.overallScore) || 85,
    summary: String(raw.summary || ""),
    modelVersion: import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini",
    accuracy,
  };
}

export async function analyzePalmWithOpenAI(file: File): Promise<PalmAnalysisResult> {
  const dataUrl = await fileToDataUrl(file);
  const content = await chatCompletion(
    [
      {
        role: "user",
        content: [
          { type: "text", text: PALM_PROMPT },
          { type: "image_url", image_url: { url: dataUrl, detail: "high" } },
        ],
      },
    ],
    4000,
  );

  const parsed = parseJsonFromContent(content);
  return normalizePalmResult(parsed);
}

function reduceToSingleDigit(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split("")
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return n;
}

function pythagoreanValue(c: string): number {
  const code = c.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
  return (code % 9) + 1;
}

export function computeNumerologyNumbers(fullName: string, birthDate: string) {
  const digits = birthDate.replace(/\D/g, "");
  const lifePathNumber = reduceToSingleDigit(
    digits.split("").reduce((s, d) => s + parseInt(d, 10), 0),
  );
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, "");
  const destinyNumber = reduceToSingleDigit(
    letters.split("").reduce((s, c) => s + pythagoreanValue(c), 0),
  );
  const soulNumber = reduceToSingleDigit(
    letters
      .split("")
      .filter((c) => "AEIOU".includes(c))
      .reduce((s, c) => s + pythagoreanValue(c), 0) || lifePathNumber,
  );
  const personalityNumber = reduceToSingleDigit(
    letters
      .split("")
      .filter((c) => !"AEIOU".includes(c))
      .reduce((s, c) => s + pythagoreanValue(c), 0) || destinyNumber,
  );

  return {
    lifePathNumber,
    destinyNumber,
    soulNumber,
    personalityNumber,
    luckyNumbers: [
      lifePathNumber,
      destinyNumber,
      (lifePathNumber + destinyNumber) % 9 || 9,
    ],
  };
}

export async function generateNumerologyWithOpenAI(
  fullName: string,
  birthDate: string,
): Promise<Record<string, unknown>> {
  const computed = computeNumerologyNumbers(fullName, birthDate);
  const prompt = `Provide a detailed numerology reading for:
Name: ${fullName}, Birth Date: ${birthDate}
Life Path: ${computed.lifePathNumber}, Destiny: ${computed.destinyNumber}, Soul: ${computed.soulNumber}, Personality: ${computed.personalityNumber}
Return ONLY valid JSON with keys:
title (archetype name e.g. "The Seeker"),
interpretation (2-3 sentence core reading),
personality (personality overview text),
traits (array of 4 trait words),
strengths (array of 4 strengths),
challenges (array of 3 challenges),
compatibility (array of 3-5 compatible zodiac signs),
yearPrediction (career/life path for this year),
monthPrediction (love/relationships this month),
career_path (ideal careers),
love_insights (relationship guidance),
lucky_color, element (Fire/Water/Earth/Air).`;

  const content = await chatCompletion([{ role: "user", content: prompt }], 2000);
  const ai = parseJsonFromContent(content);
  return { ...computed, ...ai, fullName, birthDate };
}

export async function generateAstrologyWithOpenAI(
  birthData: {
    name?: string;
    birthDate?: string;
    birthTime?: string;
    birthPlace?: string;
    gender?: string;
    questions?: string;
  },
  language = "en",
  focusAreas: string[] = [],
): Promise<Record<string, unknown>> {
  const prompt = `Generate a detailed astrology reading for:
Name: ${birthData.name || "Seeker"}
Gender: ${birthData.gender || "Unknown"}
Birth Date: ${birthData.birthDate || "Unknown"}
Birth Time: ${birthData.birthTime || "Unknown"}
Birth Place: ${birthData.birthPlace || "Unknown"}
Focus Areas: ${focusAreas.join(", ") || "General"}
Questions: ${birthData.questions || "None"}
Language: ${language}

Return ONLY raw valid JSON (no markdown, no code blocks) using EXACTLY these snake_case keys:
{
  "sun_sign": "Leo",
  "moon_sign": "Scorpio",
  "rising_sign": "Gemini",
  "overview": {
    "summary": "2-3 sentence overall reading summary.",
    "key_themes": ["theme1", "theme2", "theme3"],
    "confidence": 0.88
  },
  "planetary_positions": [
    {"planet": "Sun", "sign": "Leo", "house": "1st House", "aspect": "Core identity and life force"},
    {"planet": "Moon", "sign": "Scorpio", "house": "4th House", "aspect": "Emotional world and instincts"},
    {"planet": "Mercury", "sign": "Virgo", "house": "2nd House", "aspect": "Communication and intellect"},
    {"planet": "Venus", "sign": "Libra", "house": "3rd House", "aspect": "Love and beauty"}
  ],
  "personality": {
    "summary": "Overall personality description.",
    "traits": ["Detail-oriented", "Nurturing", "Diplomatic", "Intuitive", "Adaptable"],
    "confidence": 0.87
  },
  "strengths": {
    "items": ["Natural leadership", "Strong intuition", "Empathy", "Creativity"],
    "summary": "These are your core strengths.",
    "confidence": 0.90
  },
  "challenges": {
    "items": ["Overthinking", "Perfectionism", "Emotional sensitivity"],
    "summary": "These are areas for growth.",
    "confidence": 0.82
  },
  "life_predictions": [
    {"area": "Career", "timeframe": "Next 12 months", "prediction": "Career prediction here.", "confidence": 0.85},
    {"area": "Love", "timeframe": "Next 6 months", "prediction": "Love prediction here.", "confidence": 0.80},
    {"area": "Health", "timeframe": "Ongoing", "prediction": "Health prediction here.", "confidence": 0.88},
    {"area": "Finance", "timeframe": "Next year", "prediction": "Finance prediction here.", "confidence": 0.78}
  ],
  "compatibility": [
    {"sign": "Taurus", "match": 0.88, "type": "High Compatibility"},
    {"sign": "Cancer", "match": 0.82, "type": "Strong Match"},
    {"sign": "Pisces", "match": 0.79, "type": "Harmonious"}
  ],
  "lucky_numbers": [3, 7, 12, 21, 33],
  "model_version": "gpt-4o-mini"
}
Replace ALL placeholder values with REAL analysis based on the actual birth data provided.`;

  const content = await chatCompletion([{ role: "user", content: prompt }], 4000);
  return parseJsonFromContent(content);
}

export async function interpretDreamWithOpenAI(dream: string): Promise<{
  title: string;
  summary: string;
  symbols: string[];
  guidance: string;
  emotionalTone: string;
}> {
  const prompt = `You are Astra, a warm Cosmic Astro dream guide.
Interpret this dream in an empowering, mystical but practical tone.
Dream: """${dream.trim()}"""

Return ONLY valid JSON with keys:
title (short poetic title),
summary (3-4 sentences interpretation),
symbols (array of 3-6 key symbols with brief meaning each as "Symbol — meaning"),
guidance (2 sentences of actionable guidance),
emotionalTone (one short phrase).`;

  const content = await chatCompletion([{ role: "user", content: prompt }], 2000);
  const raw = parseJsonFromContent(content);
  return {
    title: String(raw.title || "Dream Vision"),
    summary: String(raw.summary || ""),
    symbols: Array.isArray(raw.symbols) ? raw.symbols.map(String) : [],
    guidance: String(raw.guidance || ""),
    emotionalTone: String(raw.emotionalTone || "Reflective"),
  };
}

export async function askAstraWithOpenAI(
  message: string,
  history: Array<{ role: "user" | "assistant"; content: string }> = [],
): Promise<string> {
  const system = `You are Astra, the guide for AI Cosmic Astro.
Speak warmly, clearly, and mystically — like a wise friend under the stars.
Keep answers concise (2-5 short paragraphs). Cover astrology, tarot, numerology,
dreams, planets, and houses when asked. Never claim medical, legal, or financial certainty.
If the user asks something unrelated, gently steer back to cosmic guidance.`;

  const content = await chatCompletion(
    [
      { role: "system", content: system },
      ...history.slice(-8),
      { role: "user", content: message },
    ],
    1200,
  );
  return content.trim();
}

/** Speak text with OpenAI TTS. Returns an object URL — caller should revoke it. */
export async function speakWithOpenAI(
  text: string,
  options?: { voice?: string },
): Promise<string> {
  const cleaned = text.replace(/\s+/g, " ").trim().slice(0, 4000);
  if (!cleaned) throw new Error("Nothing to speak");

  const response = await fetch(openaiUrl("/v1/audio/speech"), {
    method: "POST",
    headers: openaiHeaders(true),
    body: JSON.stringify({
      model: import.meta.env.VITE_OPENAI_TTS_MODEL || "tts-1",
      voice: options?.voice || (import.meta.env.VITE_OPENAI_TTS_VOICE || "nova"),
      input: cleaned,
      response_format: "mp3",
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const errMsg =
      (data as { error?: { message?: string } })?.error?.message ||
      `OpenAI TTS error ${response.status}`;
    throw new Error(errMsg);
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

/** Transcribe microphone audio with OpenAI Whisper / gpt-4o-transcribe. */
export async function transcribeWithOpenAI(audioBlob: Blob): Promise<string> {
  const form = new FormData();
  const ext = audioBlob.type.includes("mp4") ? "mp4" : "webm";
  form.append("file", audioBlob, `astra-voice.${ext}`);
  form.append("model", import.meta.env.VITE_OPENAI_STT_MODEL || "whisper-1");
  form.append("language", "en");

  const response = await fetch(openaiUrl("/v1/audio/transcriptions"), {
    method: "POST",
    headers: openaiHeaders(false),
    body: form,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errMsg =
      (data as { error?: { message?: string } })?.error?.message ||
      `OpenAI STT error ${response.status}`;
    throw new Error(errMsg);
  }

  const text = String((data as { text?: string }).text || "").trim();
  if (!text) throw new Error("Could not understand the audio. Try again.");
  return text;
}

/** Record from the mic until stop() is called. */
export function createVoiceRecorder(): Promise<{
  stop: () => Promise<Blob>;
  cancel: () => void;
}> {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "audio/webm";
      const recorder = new MediaRecorder(stream, { mimeType: mime });
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.start(250);

      resolve({
        stop: () =>
          new Promise((res, rej) => {
            recorder.onstop = () => {
              stream.getTracks().forEach((t) => t.stop());
              res(new Blob(chunks, { type: mime }));
            };
            recorder.onerror = () => {
              stream.getTracks().forEach((t) => t.stop());
              rej(new Error("Recording failed"));
            };
            if (recorder.state !== "inactive") recorder.stop();
          }),
        cancel: () => {
          if (recorder.state !== "inactive") recorder.stop();
          stream.getTracks().forEach((t) => t.stop());
        },
      });
    } catch {
      reject(new Error("Microphone access denied. Allow mic permission to talk to Astra."));
    }
  });
}
