"use client"

import { useState } from "react"
import { ArrowUp, FolderOpen } from "lucide-react"

export function CommandInput() {
  const [value, setValue] = useState("")

  return (
    <div className="px-8 pb-4">
      <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5 shadow-sm transition-colors focus-within:border-foreground/30">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Instruct AI (e.g., 'Optimize for Google Frontend role', 'Write a cover letter')..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          aria-label="Instruct the AI career coach"
        />
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
          Drop CV
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          disabled={value.trim().length === 0}
          aria-label="Send instruction"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
