const DiseaseSection = () => {

  const plants = [
    {
      emoji: "🌾",
      name: "Wheat",
      diseases: [
        "Loose Smut",
        "Septoria",
        "Brown Rust",
        "Yellow Rust",
      ],
    },

    {
      emoji: "🍚",
      name: "Rice",
      diseases: [
        "Blast",
        "Bacterical Blight",
        "Brown Spot",
        "Tungro",
      ],
    },

    {
      emoji: "🎋",
      name: "Sugarcane",
      diseases: [
        "RedRot",
        "Rust",
        "Mosaic",
        "Yellow",
      ],
    },
  ];

  return (
    <section
      id="disease"
      className="py-28 bg-[#1a3a2a]"
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-20">

          <p className="uppercase tracking-[4px] text-sm text-yellow-400 font-bold mb-4">
            Disease Prediction Model
          </p>

          <h2 className="text-5xl font-black text-white leading-tight mb-6">

            Detect diseases
            <br />
            across 3 major crops

          </h2>

          <p className="text-white/60 text-lg max-w-2xl">
            Our AI model predicts 12 diseases across 3 supported plants.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {plants.map((plant) => (

            <div
              key={plant.name}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition"
            >

              <div className="p-8 border-b border-white/10 flex items-center gap-4">

                <div className="text-5xl">
                  {plant.emoji}
                </div>

                <div>

                  <h3 className="text-3xl font-black text-white">
                    {plant.name}
                  </h3>

                  <p className="text-white/40 text-sm">
                    AI Supported Plant
                  </p>

                </div>
              </div>

              <div className="p-8 space-y-4">

                {plant.diseases.map((disease) => (

                  <div
                    key={disease}
                    className="bg-white/5 border-l-4 border-green-400 rounded-xl px-5 py-4 flex justify-between items-center"
                  >

                    <span className="text-white/80">
                      {disease}
                    </span>

                    <span className="bg-green-400/20 text-green-300 text-xs px-3 py-1 rounded-full font-bold">
                      AI
                    </span>

                  </div>

                ))}

              </div>
            </div>

          ))}

        </div>
      </div>
    </section>
  );
};

export default DiseaseSection;