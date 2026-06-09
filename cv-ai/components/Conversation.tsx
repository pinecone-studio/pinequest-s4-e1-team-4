"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type Message = {
  id: string;
  role: "ai" | "user";
  content: string;
};

interface ConversationProps {
  messages: Message[];
  isLoading: boolean;
}

export function Conversation({ messages, isLoading }: ConversationProps) {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-none">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all duration-200",
                message.role === "ai"
                  ? "bg-muted text-foreground rounded-tl-sm"
                  : "bg-foreground text-background rounded-tr-sm",
              )}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground rounded-2xl rounded-tl-sm px-4 py-3 text-sm flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-foreground" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
