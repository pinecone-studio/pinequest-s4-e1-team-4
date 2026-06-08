"use client"

import { useState } from "react"
import { FileText, Mail, MessagesSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const tools = [
  { id: "resumes", label: "Resumes", icon: FileText },
  { id: "cover-letters", label: "Cover Letters", icon: Mail },
  { id: "interviews", label: "Interviews", icon: MessagesSquare },
]

export function FloatingNav() {
  const [active, setActive] = useState("resumes")

  return (
    <div className="px-8 pb-6">
      <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/80 p-1 shadow-sm backdrop-blur">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = active === tool.id
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => setActive(tool.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {tool.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
