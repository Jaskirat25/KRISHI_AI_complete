const ComingSoon = () => {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[4px] text-sm text-green-600 font-bold mb-4">
          Coming Soon
        </p>

        <h2 className="text-5xl font-black text-[#1a3a2a] mb-16">

          Exciting Features
          <br />
          On The Way

        </h2>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="border-2 border-dashed border-green-200 rounded-3xl p-8">

            <div className="text-5xl mb-6">
              🎙️
            </div>

            <h3 className="text-3xl font-black text-[#1a3a2a] mb-4">
              Voice Assistant
            </h3>

            <p className="text-gray-600 leading-7 mb-6">

              Speak your farming questions in your local language.

            </p>

            <div className="flex flex-wrap gap-3">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                Hindi
              </span>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                Punjabi
              </span>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                Coming Soon
              </span>

            </div>
          </div>

          <div className="border-2 border-dashed border-green-200 rounded-3xl p-8">

            <div className="text-5xl mb-6">
              🌦️
            </div>

            <h3 className="text-3xl font-black text-[#1a3a2a] mb-4">
              Weather AI
            </h3>

            <p className="text-gray-600 leading-7">
              Personalized farming recommendations based on local weather.
            </p>

          </div>

          <div className="border-2 border-dashed border-green-200 rounded-3xl p-8">

            <div className="text-5xl mb-6">
              🛒
            </div>

            <h3 className="text-3xl font-black text-[#1a3a2a] mb-4">
              Mandi Prices
            </h3>

            <p className="text-gray-600 leading-7">
              Real-time mandi price tracking across India.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ComingSoon;