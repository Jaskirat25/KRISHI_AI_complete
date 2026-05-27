const steps = [
  {
    icon: "📸",
    title: "Upload Image",
    desc: "Upload crop image from your mobile or desktop.",
  },

  {
    icon: "🤖",
    title: "AI Analysis",
    desc: "Our AI model analyzes diseases instantly.",
  },

  {
    icon: "💡",
    title: "Get Prediction",
    desc: "Receive accurate disease prediction results.",
  },

  {
    icon: "🌱",
    title: "Save Your Crop",
    desc: "Take proper action using AI recommendations.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how"
      className="py-28 bg-[#faf7f0]"
    >

      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[4px] text-sm text-green-600 font-bold mb-4">
          How It Works
        </p>

        <h2 className="text-5xl font-black text-[#1a3a2a] mb-16">

          Simple Steps,
          <br />
          Powerful Results

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (

            <div
              key={step.title}
              className="bg-white rounded-3xl p-8 shadow-lg relative hover:-translate-y-2 transition"
            >

              <span className="absolute top-5 right-5 text-6xl font-black text-green-100">
                0{index + 1}
              </span>

              <div className="text-5xl mb-6">
                {step.icon}
              </div>

              <h3 className="text-2xl font-black text-[#1a3a2a] mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {step.desc}
              </p>

            </div>

          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;