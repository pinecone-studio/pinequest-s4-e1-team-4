const features = [
  {
    title: "CV шинжилгээ",
    desc: "Таны CV-г уншаад сул тал, сайжруулах хэсгийг AI хэлж өгнө.",
    icon: "?",
  },
  {
    title: "Mock interview",
    desc: "Жинхэнэ ярилцлага шиг асуулт асууж, хариултыг үнэлнэ.",
    icon: "?",
  },
  {
    title: "AI feedback",
    desc: "Хариулт бүр дээр оноо, зөвлөгөө, сайжруулах хувилбар өгнө.",
    icon: "?",
  },
  {
    title: "Ажлын байрны дагуу",
    desc: "Frontend, Backend, Designer зэрэг role-д тохирсон асуулт гаргана.",
    icon: "?",
  },
  {
    title: "Монгол хэл дээр",
    desc: "Монгол хэрэглэгчдэд ойлгомжтой, энгийн хэлээр тусална.",
    icon: "?",
  },
  {
    title: "Хурдан бэлтгэл",
    desc: "5-10 минутын дотор ярилцлагын бэлтгэлээ эхлүүлэх боломжтой.",
    icon: "?",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <p className="font-semibold text-[#630ed4]">Боломжууд</p>
        <h2 className="mt-3 text-4xl font-bold">
          Ярилцлагад бэлдэхэд хэрэгтэй бүх зүйл
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[#4a4455]">
          CV-гээ шалгуулахаас эхлээд AI mock interview хийх хүртэл нэг дор.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((item) => (
          <div
            key={item.title}
            className="fade-up rounded-3xl border border-purple-100 bg-white p-6 shadow-lg shadow-purple-100 transition hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold">{item.title}</h3>

            <p className="mt-3 text-sm leading-6 text-[#4a4455]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
