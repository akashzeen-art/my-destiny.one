import { useEffect, useRef, useState } from "react";
import { Mic, Square, Volume2 } from "lucide-react";
import Layout from "@/components/Layout";
import {
  createVoiceRecorder,
  interpretDreamWithOpenAI,
  isOpenAIConfigured,
  speakWithOpenAI,
  transcribeWithOpenAI,
} from "@/lib/openaiService";
import { cn } from "@/lib/utils";

/** Cosmic Astro — Dream interpretation via OpenAI (+ voice in / out). */
const DreamInterpretation = () => {
  const [dream, setDream] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof interpretDreamWithOpenAI>
  > | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const recorderRef = useRef<{ stop: () => Promise<Blob>; cancel: () => void } | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      recorderRef.current?.cancel();
    };
  }, []);

  const stopSpeaking = () => {
    audioRef.current?.pause();
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setSpeaking(false);
  };

  const playReading = async (reading: NonNullable<typeof result>) => {
    stopSpeaking();
    setSpeaking(true);
    const script = [
      reading.title,
      reading.summary,
      reading.symbols.join(". "),
      reading.guidance,
    ]
      .filter(Boolean)
      .join("\n\n");
    try {
      const url = await speakWithOpenAI(script);
      objectUrlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setSpeaking(false);
      await audio.play();
    } catch (err) {
      setSpeaking(false);
      setError(err instanceof Error ? err.message : "Could not play voice.");
    }
  };

  const runInterpretation = async (text: string) => {
    setError(null);
    setResult(null);

    if (!text.trim() || text.trim().length < 20) {
      setError("Describe your dream in a little more detail (at least a few sentences).");
      return;
    }
    if (!isOpenAIConfigured()) {
      setError("OpenAI is not configured. Add VITE_OPENAI_API_KEY to .env and restart the app.");
      return;
    }

    setLoading(true);
    try {
      const reading = await interpretDreamWithOpenAI(text);
      setResult(reading);
      void playReading(reading);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not interpret this dream. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await runInterpretation(dream);
  };

  const toggleMic = async () => {
    setError(null);
    if (recording && recorderRef.current) {
      setRecording(false);
      setTranscribing(true);
      try {
        const blob = await recorderRef.current.stop();
        recorderRef.current = null;
        const text = await transcribeWithOpenAI(blob);
        setDream(text);
        await runInterpretation(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Voice capture failed.");
      } finally {
        setTranscribing(false);
      }
      return;
    }

    if (!isOpenAIConfigured()) {
      setError("OpenAI is not configured. Add VITE_OPENAI_API_KEY to .env and restart the app.");
      return;
    }

    try {
      recorderRef.current = await createVoiceRecorder();
      setRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Microphone unavailable.");
    }
  };

  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-2xl px-4">
          <h1 className="cosmic-horoscope-title mb-3 text-center">
            Dream <span>Interpretation</span>
          </h1>
          <p className="cosmic-basic-text mx-auto mb-6 max-w-lg text-center">
            Type or speak your dream — Astra will read it aloud with you.
          </p>

          <form onSubmit={handleSubmit} className="cosmic-infobox mb-6 space-y-4 p-5 text-left">
            <div className="flex items-center justify-between gap-2">
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AB8D60]">
                Your dream
              </label>
              <button
                type="button"
                onClick={() => void toggleMic()}
                disabled={loading || transcribing}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] uppercase tracking-wide",
                  recording
                    ? "border-red-400 text-red-300 animate-pulse"
                    : "border-white/15 text-white/70 hover:border-[#AB8D60]/50 hover:text-[#AB8D60]"
                )}
              >
                {recording ? <Square className="h-3 w-3 fill-current" /> : <Mic className="h-3.5 w-3.5" />}
                {recording ? "Stop" : transcribing ? "Transcribing…" : "Speak dream"}
              </button>
            </div>
            <textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              rows={6}
              placeholder="I was walking through a dark forest when a silver moon rose..."
              className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#AB8D60]/50 focus:outline-none"
              disabled={loading || recording || transcribing}
            />
            <button
              type="submit"
              disabled={loading || recording || transcribing}
              className="cosmic-category-btn mx-auto max-w-xs disabled:opacity-60"
            >
              {loading ? "Reading the dream…" : "Interpret with Astra"}
            </button>
          </form>

          {error && (
            <p className="mb-4 text-center text-sm text-red-300/90">{error}</p>
          )}

          {result && (
            <div className="cosmic-infobox space-y-4 p-5 text-left">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.2em] text-[#AB8D60]">
                  {result.emotionalTone}
                </p>
                <button
                  type="button"
                  onClick={() => (speaking ? stopSpeaking() : void playReading(result))}
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#AB8D60] hover:text-white"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  {speaking ? "Stop" : "Play voice"}
                </button>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-white">
                {result.title}
              </h2>
              <p className="cosmic-basic-text text-left">{result.summary}</p>
              {result.symbols.length > 0 && (
                <ul className="cosmic-check-list">
                  {result.symbols.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
              <p className="cosmic-basic-text text-left text-[#AB8D60]">{result.guidance}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DreamInterpretation;
