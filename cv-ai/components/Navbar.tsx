"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/60 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="font-bold text-[#630ed4]">☯ ЯрилцлагаAI</div>

        <div className="hidden items-center gap-8 text-sm md:flex">
          <a className="cursor-pointer hover:text-[#630ed4]">Боломжууд</a>

          <a className="cursor-pointer hover:text-[#630ed4]">Ажиллах зарчим</a>

          <a className="cursor-pointer hover:text-[#630ed4]">Сэтгэгдэл</a>

          <button className="rounded-lg bg-[#630ed4] px-5 py-2 text-white transition hover:bg-[#520bb0]">
            Эхлэх
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="text-3xl md:hidden">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-purple-100 bg-white px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            <a className="cursor-pointer hover:text-[#630ed4]">Боломжууд</a>

            <a className="cursor-pointer hover:text-[#630ed4]">
              Ажиллах зарчим
            </a>

            <a className="cursor-pointer hover:text-[#630ed4]">Сэтгэгдэл</a>

            <button className="rounded-lg bg-[#630ed4] py-3 text-white">
              Эхлэх
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
