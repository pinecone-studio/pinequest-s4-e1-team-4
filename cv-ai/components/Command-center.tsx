"use client";

import React, { useState, useEffect, useRef } from "react";
import { Conversation, Message } from "./Conversation";
import { CommandInput } from "./Command-input";
import { Globe } from "lucide-react";
import type { CvData } from "@/lib/cv/types";

interface CommandCenterProps {
  onExtract?: (data: any) => void;
  onCvUpdate?: (data: any) => void;
  resumeData?: CvData;
}

export function CommandCenter({
  onExtract,
  onCvUpdate,
  resumeData,
}: CommandCenterProps) {
  const [language, setLanguage] = useState<"mn" | "en">("mn");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Сайн байна уу? Би таны AI туслах байна. Ажлын ярилцлагадаа бэлдэх үү эсвэл CV-гээ засуулах уу?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const lastPlayedId = useRef<string | null>(null);

  const speak = async (text: string, lang: "mn" | "en") => {
    if (lang === "en") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      try {
        const res = await fetch("/api/chimege-tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.play();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage &&
      lastMessage.role === "ai" &&
      lastMessage.id !== lastPlayedId.current
    ) {
      lastPlayedId.current = lastMessage.id;
      speak(lastMessage.content, language);
    }
  }, [messages, language]);

  const addMessage = (message: Message) =>
    setMessages((prev) => [...prev, message]);

  return (
    <section className="flex h-full min-h-[520px] w-full flex-col bg-background">
      <header className="flex items-center justify-between px-8 py-5 border-b border-border/40">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            Resume Coach
          </span>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">Active Session</span>
          <span className="ml-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            Live
          </span>
        </div>

        <button
          onClick={() => {
            const nextLang = language === "mn" ? "en" : "mn";
            setLanguage(nextLang);
            const alertMsg =
              nextLang === "mn"
                ? "Монгол хэл рүү шилжлээ."
                : "Switched to English.";
            setMessages((prev) => [
              ...prev,
              { id: Date.now().toString(), role: "ai", content: alertMsg },
            ]);
          }}
          className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-xs px-3 py-1.5 rounded-lg border border-border transition-all text-foreground"
        >
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          {language === "mn" ? "Монгол 🇲🇳" : "English 🇺🇸"}
        </button>
      </header>

      <Conversation messages={messages} isLoading={isLoading} />

      <CommandInput
        onAddMessage={addMessage}
        setIsQueryLoading={setIsLoading}
        messages={messages}
        onExtract={onExtract}
        onCvUpdate={onCvUpdate}
        resumeData={resumeData}
        language={language}
      />
    </section>
  );
}
