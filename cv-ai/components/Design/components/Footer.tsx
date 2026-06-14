type FooterProps = {
  isLightMode: boolean;
};

export function Footer({ isLightMode }: FooterProps) {
  return (
    <footer
      id="footer"
      className={`relative border-t px-5 py-10   sm:px-8 ${
        isLightMode
          ? "border-[#dbeafe] bg-white text-[#08111f]"
          : "border-[#0f2942] bg-[#07111f] text-white"
      }`}
    >
      <div
        className={` mx-auto flex max-w-7xl flex-col gap-6 rounded-[1.75rem] px-5 py-6 md:flex-row md:items-center md:justify-between sm:px-6 ${
          isLightMode ? "footer-glass-light" : "footer-glass-dark"
        }`}
      >
        <div>
          <p className="text-lg font-semibold tracking-[0.01em]">Interview AI</p>
          <p className={`mt-2 max-w-xl text-sm leading-6 ${isLightMode ? "text-[#526b82]" : "text-[#9db7d3]"}`}>
            Resume засах, ярилцлагад бэлдэх, дараагийн алхмаа ойлгоход
            зориулсан AI туслах.
          </p>
        </div>
        <div className={`flex flex-wrap gap-3 text-sm font-semibold ${isLightMode ? "text-[#526b82]" : "text-[#9db7d3]"}`}>
          <a className="transition hover:text-[#38bdf8]" href="#intro">
            Танилцуулга
          </a>
          <a className="transition hover:text-[#38bdf8]" href="#tools">
            Resume ба Interview
          </a>
        </div>
      </div>
    </footer>
  );
}
