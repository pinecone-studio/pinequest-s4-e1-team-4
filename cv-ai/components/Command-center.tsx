"use client";

import React, { useState } from "react";
import { Conversation, Message } from "./Conversation";
import { CommandInput } from "./Command-input";

interface CommandCenterProps {
  onExtract?: (data: any) => void;
}

export function CommandCenter({ onExtract }: CommandCenterProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Welcome back. Tell me the role you're targeting and I'll tailor your resume, keywords, and structure instantly.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: Message) =>
    setMessages((prev) => [...prev, message]);

  return (
    <section className="flex h-screen w-full flex-col border-b border-border lg:w-1/2 lg:border-b-0 lg:border-r bg-background">
      <header className="flex items-center gap-2 px-8 py-5 border-b border-border/40">
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
      </header>

      <Conversation messages={messages} isLoading={isLoading} />

      <CommandInput
        onAddMessage={addMessage}
        setIsQueryLoading={setIsLoading}
        messages={messages}
        onExtract={onExtract}
      />
    </section>
  );
}
