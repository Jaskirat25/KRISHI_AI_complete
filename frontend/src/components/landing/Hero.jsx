import {
  ArrowRight,
  MessageSquare,
  Mic,
  Microscope,
} from "lucide-react";

const launchOptions = [
  {
    id: "text",
    title: "Chat with KrishiAI",
    eyebrow: "Text API",
    description:
      "Ask crop questions, treatment follow-ups, and farming doubts in a dedicated chat view.",
    cta: "Open Chat",
    icon: MessageSquare,
    enabled: true,
  },
  {
    id: "image",
    title: "Detect Disease",
    eyebrow: "Image Upload",
    description:
      "Upload a crop or leaf photo to get an instant AI disease prediction and confidence score.",
    cta: "Open Detector",
    icon: Microscope,
    enabled: true,
  },
  {
    id: "voice",
    title: "Voice Assistant",
    eyebrow: "Voice Support",
    description:
      "Hands-free guidance in local languages is planned next, so this entry stays locked for now.",
    cta: "Coming Soon",
    icon: Mic,
    enabled: false,
  },
];

const Hero = ({ openApp }) => {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(26,58,42,0.92), rgba(45,106,79,0.76)), url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-32">
        <div className="max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-yellow-300">
            AI Powered Farming Assistant
          </div>

          <h1 className="mb-6 text-5xl font-black leading-tight text-white md:text-7xl">
            Smart Farming
            <br />
            Starts with
            <br />
            <span className="text-yellow-400">
              KrishiAI
            </span>
          </h1>

          <p className="mb-10 max-w-3xl text-lg leading-8 text-white/75 md:text-xl">
            Detect crop diseases instantly, ask farming questions in chat, and
            get ready for upcoming voice support in local Indian languages.
          </p>

          <div
            id="try-it-out"
            className="scroll-mt-28"
          >
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-white">
                Try It Out
              </span>

              <p className="text-sm text-white/70 md:text-base">
                Choose how you want to start using KrishiAI today.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {launchOptions.map((option) => {
                const Icon = option.icon;

                const cardClasses = option.enabled
                  ? "group cursor-pointer border-white/15 bg-white/10 hover:-translate-y-1 hover:border-yellow-300/50 hover:bg-white/20"
                  : "cursor-not-allowed border-white/10 bg-black/10 opacity-90";

                return option.enabled ? (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      openApp(option.id)
                    }
                    className={`min-h-[260px] rounded-[28px] border p-6 text-left text-white backdrop-blur-md transition ${cardClasses}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-[#1a3a2a] shadow-lg shadow-yellow-400/20">
                        <Icon size={24} />
                      </div>

                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                        {option.eyebrow}
                      </span>
                    </div>

                    <h3 className="mt-8 text-3xl font-black leading-tight">
                      {option.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/70">
                      {option.description}
                    </p>

                    <div className="mt-8 inline-flex items-center gap-2 font-semibold text-yellow-300">
                      {option.cta}
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </button>
                ) : (
                  <div
                    key={option.id}
                    className={`min-h-[260px] rounded-[28px] border p-6 text-left text-white/85 backdrop-blur-md transition ${cardClasses}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-yellow-300">
                        <Icon size={24} />
                      </div>

                      <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-200">
                        {option.cta}
                      </span>
                    </div>

                    <h3 className="mt-8 text-3xl font-black leading-tight">
                      {option.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/70">
                      {option.description}
                    </p>

                    <div className="mt-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
                      Voice support is on the way
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#about"
              className="rounded-xl border border-white/30 px-8 py-4 text-white transition hover:bg-white/10"
            >
              Learn More
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-8 py-4 text-yellow-200 transition hover:bg-yellow-400/15"
            >
              Contact Us
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-10">
            <div>
              <h3 className="text-4xl font-black text-yellow-400">
                12+
              </h3>

              <p className="text-sm text-white/60">
                Diseases Detected
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-yellow-400">
                3
              </h3>

              <p className="text-sm text-white/60">
                Crops Supported
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-yellow-400">
                Hindi + Punjabi
              </h3>

              <p className="text-sm text-white/60">
                Voice AI Coming Soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
