const reviews = [
  {
    name: "Тэмүүлэн",
    role: "Frontend Developer",
    text: "AI mock interview хийснээр жинхэнэ ярилцлага дээр илүү итгэлтэй болсон.",
  },
  {
    name: "Номин",
    role: "UI/UX Designer",
    text: "CV дээрх алдаануудаа олж засуулсан нь маш хэрэгтэй байсан.",
  },
  {
    name: "Билгүүн",
    role: "Backend Developer",
    text: "Асуултууд нь яг бодит interview шиг байсан.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f1f3ff] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-semibold text-[#630ed4]">Сэтгэгдлүүд</p>

          <h2 className="mt-3 text-4xl font-bold">
            Хэрэглэгчид юу хэлж байна?
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl bg-white p-7 shadow-lg shadow-purple-100"
            >
              <div className="mb-5 flex gap-1 text-yellow-400">★★★★★</div>

              <p className="text-[#4a4455] leading-7">{review.text}</p>

              <div className="mt-8">
                <h3 className="font-bold">{review.name}</h3>

                <p className="text-sm text-[#630ed4]">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
