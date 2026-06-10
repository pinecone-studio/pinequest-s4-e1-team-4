// "use client";

// import React, { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Paperclip, ArrowUp, Loader2 } from "lucide-react";
// import { Message } from "./Conversation";

// interface CommandInputProps {
//   messages: Message[];
//   onAddMessage: (msg: Message) => void;
//   setIsQueryLoading: (loading: boolean) => void;
// }

// export function CommandInput({
//   messages,
//   onAddMessage,
//   setIsQueryLoading,
// }: CommandInputProps) {
//   const [input, setInput] = useState("");
//   const [localLoading, setLocalLoading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleSendText = async () => {
//     if (!input.trim() || localLoading) return;

//     const userMsg: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: input,
//     };
//     onAddMessage(userMsg);
//     setInput("");

//     setIsQueryLoading(true);
//     setLocalLoading(true);

//     try {
//       const apiMessages = messages.map((m) => ({
//         role: m.role === "ai" ? "assistant" : "user",
//         content: m.content,
//       }));
//       apiMessages.push({ role: "user", content: userMsg.content });

//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: apiMessages }),
//       });

//       if (!res.ok) throw new Error(`Сүлжээний алдаа гарлаа: ${res.status}`);

//       const data = await res.json();

//       if (data.message) {
//         onAddMessage({
//           id: (Date.now() + 1).toString(),
//           role: "ai",
//           content: data.message.content,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       onAddMessage({
//         id: Date.now().toString(),
//         role: "ai",
//         content: "Уучлаарай, сүлжээний алдаа гарлаа. Серверээ шалгана уу.",
//       });
//     } finally {
//       setIsQueryLoading(false);
//       setLocalLoading(false);
//     }
//   };

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || localLoading) return;

//     onAddMessage({
//       id: Date.now().toString(),
//       role: "user",
//       content: `📁 Файл хууллаа: ${file.name}`,
//     });
//     setIsQueryLoading(true);
//     setLocalLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("/api/cv-extract", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error(`Extract API алдаа: ${res.status}`);

//       const result = await res.json();

//       if (result.data) {
//         onAddMessage({
//           id: (Date.now() + 1).toString(),
//           role: "ai",
//           content: `✨ CV-г амжилттай уншлаа! (Бүртгэгдсэн нэр: ${result.data.name || "Тодорхойгүй"}). Одоо энэ CV-г ямар ажилд зориулж сайжруулах вэ?`,
//         });

//       }
//     } catch (err) {
//       console.error(err);
//       onAddMessage({
//         id: Date.now().toString(),
//         role: "ai",
//         content: "Файл уншихад алдаа гарлаа. Дахин оролдоно уу.",
//       });
//     } finally {
//       setIsQueryLoading(false);
//       setLocalLoading(false);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   return (
//     <div className="p-6 bg-background border-t border-border">
//       <div className="flex items-center gap-2 rounded-xl border border-input bg-muted/50 p-2 shadow-sm focus-within:border-foreground focus-within:bg-background transition-all">
//         <input
//           type="file"
//           accept=".pdf,image/*"
//           ref={fileInputRef}
//           onChange={handleFileUpload}
//           className="hidden"
//         />

//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           onClick={() => fileInputRef.current?.click()}
//           className="rounded-lg h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
//           disabled={localLoading}
//         >
//           <Paperclip className="h-4 w-4" />
//         </Button>

//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSendText()}
//           placeholder="Ask AI to rewrite, create cover letter, or upload CV..."
//           className="border-0 shadow-none focus-visible:ring-0 flex-1 text-sm bg-transparent h-8 py-0"
//           disabled={localLoading}
//         />

//         <Button
//           onClick={handleSendText}
//           size="icon"
//           className="rounded-lg h-8 w-8 bg-foreground text-background hover:bg-foreground/90"
//           disabled={localLoading || !input.trim()}
//         >
//           {localLoading ? (
//             <Loader2 className="h-3 w-3 animate-spin" />
//           ) : (
//             <ArrowUp className="h-4 w-4" />
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Loader2, Paperclip } from "lucide-react";
import React, { useRef, useState } from "react";
import { Message } from "./Conversation";
import { ResumeData } from "@/components/canvas-panel";
import { Dispatch, SetStateAction } from "react";

interface CommandInputProps {
  messages: Message[];
  onAddMessage: (msg: Message) => void;
  setIsQueryLoading: (loading: boolean) => void;
  onExtract?: (data: any) => void;
  language?: "mn" | "en";
  resumeData?: any;
}

export function CommandInput({
  messages,
  onAddMessage,
  setIsQueryLoading,
  onExtract,
  language = "mn",
  resumeData = null,
}: CommandInputProps) {
  const [input, setInput] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendText = async () => {
    if (!input.trim() || localLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    onAddMessage(userMsg);
    setInput("");

    setIsQueryLoading(true);
    setLocalLoading(true);

    try {
      const apiMessages = messages.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content,
      }));
      apiMessages.push({ role: "user", content: userMsg.content });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          resumeData: resumeData,
          language: language,
        }),
      });

      if (!res.ok) throw new Error(`Сүлжээний алдаа гарлаа: ${res.status}`);

      const data = await res.json();

      if (data.message) {
        onAddMessage({
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: data.message.content,
        });
      }
    } catch (err) {
      console.error(err);
      onAddMessage({
        id: Date.now().toString(),
        role: "ai",
        content: "Уучлаарай, сүлжээний алдаа гарлаа. Серверээ шалгана уу.",
      });
    } finally {
      setIsQueryLoading(false);
      setLocalLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || localLoading) return;

    onAddMessage({
      id: Date.now().toString(),
      role: "user",
      content: `📁 Файл хууллаа: ${file.name}`,
    });
    setIsQueryLoading(true);
    setLocalLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/cv-extract", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Extract API алдаа: ${res.status}`);

      const result = await res.json();

      if (result.data) {
        // onExtract(result.data);
        onAddMessage({
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: `✨ CV-г амжилттай уншлаа! (Бүртгэгдсэн нэр: ${result.data.name || "Тодорхойгүй"}). Одоо энэ CV-г ямар ажилд зориулж сайжруулах вэ?`,
        });

        if (onExtract) {
          onExtract(result.data);
        }
      }
    } catch (err) {
      console.error(err);
      onAddMessage({
        id: Date.now().toString(),
        role: "ai",
        content: "Файл уншихад алдаа гарлаа. Дахин оролдоно уу.",
      });
    } finally {
      setIsQueryLoading(false);
      setLocalLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6 bg-background border-t border-border">
      <div className="flex items-center gap-2 rounded-xl border border-input bg-muted/50 p-2 shadow-sm focus-within:border-foreground focus-within:bg-background transition-all">
        <input
          type="file"
          accept=".pdf,image/*"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
          disabled={localLoading}
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendText()}
          placeholder="Ask AI to rewrite, create cover letter, or upload CV..."
          className="border-0 shadow-none focus-visible:ring-0 flex-1 text-sm bg-transparent h-8 py-0"
          disabled={localLoading}
        />

        <Button
          onClick={handleSendText}
          size="icon"
          className="rounded-lg h-8 w-8 bg-foreground text-background hover:bg-foreground/90"
          disabled={localLoading || !input.trim()}
        >
          {localLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
