const steps = [
  {
    number: "01",
    title: "CV-гээ оруул",
    desc: "PDF эсвэл DOCX CV-гээ оруулаад AI-д шинжлүүлнэ.",
  },
  {
    number: "02",
    title: "Ажлын байр сонго",
    desc: "Frontend, Backend, Designer гэх мэт бэлдэх role-оо бичнэ.",
  },
  {
    number: "03",
    title: "AI ярилцлага эхлүүл",
    desc: "AI тухайн ажлын байртай холбоотой асуултууд асууна.",
  },
  {
    number: "04",
    title: "Feedback ав",
    desc: "Хариултын оноо, зөвлөгөө, сайжруулсан хувилбараа авна.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-semibold text-[#630ed4]">Ажиллах зарчим</p>
          <h2 className="mt-3 text-4xl font-bold">Ердөө 4 алхам</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl bg-[#f9f9ff] p-6 text-center shadow-md shadow-purple-100"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#630ed4] text-xl font-bold text-white">
                {step.number}
              </div>

              <h3 className="mt-6 text-lg font-bold">{step.title}</h3>

              <p className="mt-3 text-sm leading-6 text-[#4a4455]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
