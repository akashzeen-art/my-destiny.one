import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Square, Volume2, VolumeX } from "lucide-react";
import Layout from "@/components/Layout";
import {
  askAstraWithOpenAI,
  createVoiceRecorder,
  speakWithOpenAI,
  transcribeWithOpenAI,
} from "@/lib/openaiService";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

/** Cosmic Astro — Talk to Astra with text + AI audio (TTS / Whisper). */
const TalkToAstra = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hello Wanderer — I'm Astra. Ask me about your stars, dreams, tarot, numbers, or anything under the cosmos. You can type or tap the mic to speak.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const recorderRef = useRef<{ stop: () => Promise<Blob>; cancel: () => void } | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, recording, transcribing]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      recorderRef.current?.cancel();
    };
  }, []);

  const stopSpeaking = useCallback(() => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setSpeakingId(null);
  }, []);

  const playSpeech = useCallback(
    async (text: string, id: number) => {
      stopSpeaking();
      setSpeakingId(id);
      try {
        const url = await speakWithOpenAI(text);
        objectUrlRef.current = url;
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => {
          setSpeakingId(null);
          if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
          }
        };
        await audio.play();
      } catch (err) {
        setSpeakingId(null);
        setError(err instanceof Error ? err.message : "Could not play Astra's voice.");
      }
    },
    [stopSpeaking],
  );

  const sendText = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    const nextHistory = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextHistory);
    setLoading(true);

    try {
      const reply = await askAstraWithOpenAI(trimmed, nextHistory);
      setMessages((prev) => {
        const next = [...prev, { role: "assistant" as const, content: reply }];
        if (autoSpeak) {
          void playSpeech(reply, next.length - 1);
        }
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Astra could not reply. Try again.");
      setMessages((prev) => prev.slice(0, -1));
      setInput(trimmed);
    } finally {
      setLoading(false);
    }
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendText(input);
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
        setInput(text);
        await sendText(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Voice capture failed.");
      } finally {
        setTranscribing(false);
      }
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
      <section className="relative flex flex-1 flex-col pb-8 pt-2">
        <div className="container relative z-[1] mx-auto flex max-w-2xl flex-1 flex-col px-4">
          <h1 className="cosmic-horoscope-title mb-2 text-center">
            Talk to <span>Astra</span>
          </h1>
          <p className="cosmic-basic-text mx-auto mb-4 max-w-md text-center">
            Ask by text or voice — Astra answers and can speak aloud.
          </p>

          <div className="mb-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (autoSpeak) stopSpeaking();
                setAutoSpeak((v) => !v);
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs uppercase tracking-wide transition",
                autoSpeak
                  ? "border-[#AB8D60]/50 bg-[#AB8D60]/15 text-[#AB8D60]"
                  : "border-white/15 text-white/50"
              )}
            >
              {autoSpeak ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              {autoSpeak ? "Voice on" : "Voice off"}
            </button>
            {speakingId !== null && (
              <button
                type="button"
                onClick={stopSpeaking}
                className="text-xs uppercase tracking-wide text-white/50 hover:text-white"
              >
                Stop
              </button>
            )}
          </div>

          <div className="cosmic-infobox mb-4 flex min-h-[320px] flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={cn(
                  "max-w-[90%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-[#AB8D60] text-white"
                    : "mr-auto bg-white/5 text-white/90"
                )}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
                {m.role === "assistant" && (
                  <button
                    type="button"
                    onClick={() =>
                      speakingId === i ? stopSpeaking() : void playSpeech(m.content, i)
                    }
                    className="mt-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#AB8D60] hover:text-white"
                    disabled={loading}
                  >
                    <Volume2 className="h-3 w-3" />
                    {speakingId === i ? "Speaking…" : "Play voice"}
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <div className="mr-auto rounded-2xl bg-white/5 px-4 py-2.5 text-sm text-[#AB8D60]">
                Astra is listening…
              </div>
            )}
            {recording && (
              <div className="mr-auto rounded-2xl bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                Recording… tap mic again to send
              </div>
            )}
            {transcribing && (
              <div className="mr-auto rounded-2xl bg-white/5 px-4 py-2.5 text-sm text-[#AB8D60]">
                Transcribing your voice…
              </div>
            )}
            <div ref={endRef} />
          </div>

          {error && <p className="mb-3 text-center text-sm text-red-300/90">{error}</p>}

          <form onSubmit={send} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void toggleMic()}
              disabled={loading || transcribing}
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition",
                recording
                  ? "border-red-400 bg-red-500/20 text-red-300 animate-pulse"
                  : "border-white/15 bg-black/30 text-white hover:border-[#AB8D60]/50 hover:text-[#AB8D60]"
              )}
              aria-label={recording ? "Stop recording" : "Start voice input"}
            >
              {recording ? <Square className="h-4 w-4 fill-current" /> : <Mic className="h-5 w-5" />}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What would you like to know?"
              className="flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#AB8D60]/50 focus:outline-none"
              disabled={loading || recording || transcribing}
            />
            <button
              type="submit"
              disabled={loading || recording || transcribing || !input.trim()}
              className="shrink-0 rounded-full bg-[#AB8D60] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default TalkToAstra;
