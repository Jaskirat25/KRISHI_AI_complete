const Contact = () => {
  return (
    <section
      id="contact"
      className="py-28 bg-[#1a3a2a]"
    >

      <div className="max-w-4xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[4px] text-sm text-yellow-400 font-bold mb-4">
          Contact Us
        </p>

        <h2 className="text-5xl font-black text-white mb-6">
          Get In Touch
        </h2>

        <p className="text-white/60 text-lg mb-12">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <form className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Your Name"
              className="bg-white/10 border border-white/10 rounded-xl px-5 py-4 text-white outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="bg-white/10 border border-white/10 rounded-xl px-5 py-4 text-white outline-none"
            />

          </div>

          <textarea
            rows="6"
            placeholder="Your Message"
            className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-4 text-white outline-none"
          ></textarea>

          <button className="bg-yellow-400 hover:bg-yellow-300 text-[#1a3a2a] px-10 py-4 rounded-xl font-black transition">
            Send Message
          </button>

        </form>
      </div>
    </section>
  );
};

export default Contact;