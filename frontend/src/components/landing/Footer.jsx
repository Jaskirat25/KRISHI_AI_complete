const Footer = () => {
  return (
    <footer className="bg-[#102217] py-10">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <h2 className="text-3xl font-black text-white">

          Krishi
          <span className="text-yellow-400">
            AI
          </span>

        </h2>

        <div className="flex gap-8 text-white/50 text-sm">

          <a href="#about" className="hover:text-yellow-400">
            About
          </a>

          <a href="#disease" className="hover:text-yellow-400">
            Disease Model
          </a>

          <a href="#how" className="hover:text-yellow-400">
            How It Works
          </a>

          <a href="#contact" className="hover:text-yellow-400">
            Contact
          </a>

        </div>

        <p className="text-white/40 text-sm">
          © 2025 KrishiAI
        </p>

      </div>
    </footer>
  );
};

export default Footer;