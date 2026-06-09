"use client";

import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CommandInput } from "./Command-input";
import { Conversation, Message } from "./Conversation";

interface CommandCenterProps {
  onExtract?: (data: any) => void;
}

export function CommandCenter({ onExtract }: CommandCenterProps) {
  const [language, setLanguage] = useState<"mn" | "en">("mn");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Welcome back. Tell me the role you're targeting and I'll tailor your resume, keywords, and structure instantly.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const lastPlayedId = useRef<string | null>(null);

  const speak = (text: string, lang: "mn" | "en") => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "mn" ? "mn-MN" : "en-US";
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
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
    <section className="flex h-screen w-full flex-col border-b border-border lg:w-1/2 lg:border-b-0 lg:border-r bg-background">
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
        language={language}
      />
    </section>
  );
}
