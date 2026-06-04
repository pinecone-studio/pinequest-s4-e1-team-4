export default function CTA() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-gradient-to-r from-[#630ed4] to-[#8b5cf6] px-8 py-16 text-center text-white shadow-2xl shadow-purple-200">
        <h2 className="text-4xl font-bold">
          Өнөөдрөөс ярилцлагадаа бэлдэж эхэл
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          CV-гээ оруулаад AI-аас асуулт, оноо, зөвлөгөө аваарай.
        </p>

        <button className="mt-8 rounded-xl bg-white px-8 py-3 font-bold text-[#630ed4] transition hover:scale-105">
          Үнэгүй эхлэх
        </button>
      </div>
    </section>
  );
}
