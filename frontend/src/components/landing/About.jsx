const About = () => {
  return (
    <section
      id="about"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
            alt="Farmer"
            className="rounded-3xl shadow-2xl"
          />

          <div className="absolute -bottom-6 -right-6 bg-[#1a3a2a] text-white p-6 rounded-2xl shadow-xl">

            <h3 className="text-4xl font-black text-yellow-400">
              95%
            </h3>

            <p className="text-sm text-white/70">
              Disease Detection Accuracy
            </p>

          </div>
        </div>

        <div>

          <p className="uppercase tracking-[4px] text-sm text-green-600 font-bold mb-4">
            About KrishiAI
          </p>

          <h2 className="text-5xl font-black text-[#1a3a2a] leading-tight mb-6">

            Your AI Farming
            <br />
            Companion

          </h2>

          <p className="text-gray-600 text-lg leading-8 mb-10">

            KrishiAI helps farmers detect crop diseases using AI image analysis and smart recommendations.

            Our system supports disease prediction for 3 major crops and upcoming voice support in local Indian languages.

          </p>

          <div className="space-y-6">

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                🌿
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#1a3a2a]">
                  Disease Detection
                </h3>

                <p className="text-gray-600">
                  Upload crop images and detect diseases instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                🎤
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#1a3a2a]">
                  Voice AI
                </h3>

                <p className="text-gray-600">
                  Hindi & Punjabi voice support coming soon.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;