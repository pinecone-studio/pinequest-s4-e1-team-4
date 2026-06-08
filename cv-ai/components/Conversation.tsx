"use client"

import { cn } from "@/lib/utils"

type Message = {
  id: number
  role: "ai" | "user"
  content: string
}

const messages: Message[] = [
  {
    id: 1,
    role: "ai",
    content:
      "Welcome back. I've loaded your current resume into the canvas on the right. Tell me the role you're targeting and I'll tailor everything — keywords, phrasing, and structure.",
  },
  {
    id: 2,
    role: "user",
    content: "Optimize it for a Senior Frontend Engineer role at Google.",
  },
  {
    id: 3,
    role: "ai",
    content:
      "Done. I rewrote your summary to emphasize large-scale React systems, surfaced your performance wins with metrics, and aligned your skills section with Google's frontend stack. Your ATS score jumped from 78% to 91%.",
  },
  {
    id: 4,
    role: "user",
    content: "Nice. Make the opening line a bit more confident.",
  },
  {
    id: 5,
    role: "ai",
    content:
      "Updated. The summary now opens with a strong, results-driven statement while staying concise and recruiter-friendly.",
  },
]

export function Conversation() {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                message.role === "ai"
                  ? "bg-muted text-foreground rounded-tl-sm"
                  : "bg-foreground text-background rounded-tr-sm",
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
