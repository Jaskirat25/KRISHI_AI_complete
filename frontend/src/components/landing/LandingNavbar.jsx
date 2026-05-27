import { Wheat } from "lucide-react";

const navLinks = [
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#disease",
    label: "Disease Model",
  },
  {
    href: "#how",
    label: "How It Works",
  },
  {
    href: "#contact",
    label: "Contact",
  },
];

const LandingNavbar = () => {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-green-900 bg-[#1a3a2a]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-yellow-400 text-[#102217]">
            <Wheat size={20} />
          </div>

          <h1 className="text-2xl font-black text-white">
            Krishi
            <span className="text-yellow-400">
              AI
            </span>
          </h1>
        </a>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-yellow-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#try-it-out"
            className="rounded-full bg-yellow-400 px-5 py-2 font-bold text-[#1a3a2a] transition hover:bg-yellow-300"
          >
            Try It Out
          </a>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
