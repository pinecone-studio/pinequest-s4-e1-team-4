export function Footer() {
  return (
    <footer id="footer" className="bg-[#101712] px-5 py-10 text-white sm:px-8">
      <div className="reveal mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">Interview AI</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
            Resume засах, ярилцлагад бэлдэх, дараагийн алхмаа ойлгоход
            зориулсан AI туслах.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-white/75">
          <a className="hover:text-white" href="#intro">
            Танилцуулга
          </a>
          <a className="hover:text-white" href="#tools">
            Resume ба Interview
          </a>
          <a className="hover:text-white" href="#home">
            Дээш буцах
          </a>
        </div>
      </div>
    </footer>
  );
}
