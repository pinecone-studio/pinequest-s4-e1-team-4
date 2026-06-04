export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-32 md:grid-cols-2">
      <div className="fade-up">
        <h1 className="text-5xl font-bold leading-tight">
          Ажлын ярилцлагад <span className="text-[#630ed4]">AI-тай бэлд</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-[#4a4455]">
          CV шалгах, AI mock interview, асуултын бэлтгэл бүгд нэг дор.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-lg bg-[#630ed4] px-6 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-[#520bb0]">
            Ярилцлага эхлүүлэх
          </button>

          <button className="rounded-lg border border-[#630ed4] px-6 py-3 font-semibold text-[#630ed4] transition hover:-translate-y-1 hover:bg-purple-50">
            Demo үзэх
          </button>
        </div>
      </div>

      <div className="fade-up delay-1 relative rounded-3xl bg-white p-8 shadow-xl shadow-purple-100">
        <div className="mx-auto h-[520px] max-w-[280px] rounded-[42px] border-[10px] border-black bg-white p-4 shadow-2xl">
          <div className="text-center text-sm font-bold text-[#630ed4]">
            AI Ярилцагч
          </div>

          <div className="mt-10 rounded-xl bg-gray-100 p-3 text-sm">
            Сайн байна уу?
          </div>

          <div className="mt-4 rounded-xl bg-purple-100 p-3 text-sm text-[#630ed4]">
            Frontend Developer ярилцлагад бэлдэж байна.
          </div>

          <div className="mt-52 flex items-center justify-between rounded-full bg-gray-100 px-4 py-3 text-xs text-gray-400">
            Зурвас бичих...
            <span className="rounded-full bg-[#630ed4] px-3 py-2 text-white">
              ➤
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
