export default function Footer() {
  return (
    <footer className="border-t border-purple-100 bg-white px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h3 className="font-bold text-[#630ed4]">☯ ЯрилцлагаAI</h3>
          <p className="mt-1 text-sm text-[#4a4455]">
            AI ашиглан ярилцлагадаа ухаалгаар бэлд.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-[#4a4455]">
          <a className="cursor-pointer hover:text-[#630ed4]">Боломжууд</a>
          <a className="cursor-pointer hover:text-[#630ed4]">Тусламж</a>
          <a className="cursor-pointer hover:text-[#630ed4]">Холбоо барих</a>
        </div>

        <p className="text-sm text-[#4a4455]">© 2026 ЯрилцлагаAI</p>
      </div>
    </footer>
  );
}
