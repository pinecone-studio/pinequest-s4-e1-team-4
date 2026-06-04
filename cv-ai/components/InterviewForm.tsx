"use client";

import { useState } from "react";

export default function InterviewForm() {
  const [role, setRole] = useState("");

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="font-semibold text-[#630ed4]">AI Interview</p>

          <h2 className="mt-3 text-4xl font-bold">Ярилцлагаа эндээс эхлүүл</h2>

          <p className="mt-4 max-w-xl text-[#4a4455]">
            Ажлын байр болон CV мэдээллээ оруулаад AI-аас тухайн role-д тохирсон
            асуулт авах боломжтой.
          </p>
        </div>

        <div className="rounded-3xl border border-purple-100 bg-[#f9f9ff] p-6 shadow-xl shadow-purple-100">
          <label className="text-sm font-semibold text-[#141b2b]">
            Ажлын байр
          </label>

          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Жишээ: Frontend Developer"
            className="mt-2 w-full rounded-2xl border border-purple-100 bg-white px-4 py-3 outline-none transition focus:border-[#630ed4]"
          />

          <label className="mt-5 block text-sm font-semibold text-[#141b2b]">
            CV файл
          </label>

          <div className="mt-2 rounded-2xl border-2 border-dashed border-purple-200 bg-white p-8 text-center">
            <p className="font-medium text-[#630ed4]">CV оруулах</p>
            <p className="mt-2 text-sm text-[#4a4455]">
              PDF эсвэл DOCX файл сонгоно
            </p>
          </div>

          <button className="mt-6 w-full rounded-2xl bg-[#630ed4] py-3 font-bold text-white transition hover:bg-[#520bb0]">
            AI асуулт үүсгэх
          </button>
        </div>
      </div>
    </section>
  );
}
