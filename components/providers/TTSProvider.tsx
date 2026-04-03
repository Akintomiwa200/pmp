// components/providers/TTSProvider.tsx
"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";

interface TTSContextValue {
  isEnabled: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  toggleEnabled: () => void;
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

const TTSContext = createContext<TTSContextValue>({
  isEnabled: false,
  isSpeaking: false,
  isPaused: false,
  toggleEnabled: () => {},
  speak: () => {},
  stop: () => {},
  pause: () => {},
  resume: () => {},
});

export function TTSProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!isEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
      stop();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => { setIsSpeaking(false); setIsPaused(false); };
      utterance.onerror = () => { setIsSpeaking(false); setIsPaused(false); };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isEnabled, stop]
  );

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis?.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis?.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const toggleEnabled = useCallback(() => {
    if (isEnabled) stop();
    setIsEnabled((e) => !e);
  }, [isEnabled, stop]);

  return (
    <TTSContext.Provider value={{ isEnabled, isSpeaking, isPaused, toggleEnabled, speak, stop, pause, resume }}>
      {children}
    </TTSContext.Provider>
  );
}

export function useTTS() {
  return useContext(TTSContext);
}

// Floating TTS control bar — appears when enabled and speaking
export function TTSBar() {
  const { isEnabled, isSpeaking, isPaused, toggleEnabled, stop, pause, resume } = useTTS();

  if (!isEnabled && !isSpeaking) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-ink rounded-full shadow-2xl border border-white/10 animate-slide-up">
      <Volume2 size={16} className="text-brand-400" />
      <span className="text-white text-sm font-medium">
        {isSpeaking && !isPaused ? "Reading..." : isPaused ? "Paused" : "TTS On"}
      </span>
      {isSpeaking && !isPaused && (
        <button onClick={pause} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
          <Pause size={14} className="text-white" />
        </button>
      )}
      {isPaused && (
        <button onClick={resume} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
          <Play size={14} className="text-white" />
        </button>
      )}
      <button onClick={stop} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
        <VolumeX size={14} className="text-white/60" />
      </button>
      <button onClick={toggleEnabled} className="text-xs text-white/40 hover:text-white/70 transition-colors">
        Disable
      </button>
    </div>
  );
}
