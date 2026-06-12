"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, ArrowUp, Loader2, Mic } from "lucide-react";
import { Message } from "./Conversation";

interface CommandInputProps {
  messages: Message[];
  onAddMessage: (msg: Message) => void;
  setIsQueryLoading: (loading: boolean) => void;
  onExtract?: (data: any) => void;
  language?: "mn" | "en";
}

export function CommandInput({
  messages,
  onAddMessage,
  setIsQueryLoading,
  onExtract,
  language = "mn",
}: CommandInputProps) {
  const [input, setInput] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleSendText = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || localLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
    };
    onAddMessage(userMsg);
    if (!overrideText) setInput("");

    setIsQueryLoading(true);
    setLocalLoading(true);

    try {
      const apiMessages = messages.map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content,
      }));
      apiMessages.push({ role: "user", content: textToSend });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, language }),
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        // 🔥 Хамгийн гол зассан хэсэг: 2.5KB-аас дээш үед л илгээнэ.
        if (audioBlob.size > 2500) {
          await sendToStt(audioBlob);
        } else {
          console.warn(
            `Аудио хэт богино байна (${audioBlob.size} bytes). Бага зэрэг урт ярина уу.`,
          );
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendToStt = async (audioBlob: Blob) => {
    setIsQueryLoading(true);
    setLocalLoading(true);
    const formData = new FormData();
    formData.append("audio", audioBlob);

    try {
      const res = await fetch("/api/chimege-stt", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          await handleSendText(data.text);
        }
      } else {
        console.error("STT Алдаа гарлаа", res.status);
      }
    } catch (err) {
      console.error(err);
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
        onAddMessage({
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: `✨ CV-г амжилттай уншлаа! Одоо энэ CV-г ямар ажилд зориулж сайжруулах вэ?`,
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

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={stopRecording}
          className={`rounded-lg h-8 w-8 transition-all ${
            isRecording
              ? "text-red-500 bg-red-500/20 animate-pulse"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          disabled={localLoading && !isRecording}
        >
          <Mic className="h-4 w-4" />
        </Button>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendText()}
          placeholder="Ask AI or hold Mic to speak..."
          className="border-0 shadow-none focus-visible:ring-0 flex-1 text-sm bg-transparent h-8 py-0"
          disabled={localLoading}
        />

        <Button
          onClick={() => handleSendText()}
          size="icon"
          className="rounded-lg h-8 w-8 bg-foreground text-background hover:bg-foreground/90"
          disabled={localLoading || !input.trim()}
        >
          {localLoading && !isRecording ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
