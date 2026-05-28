import React, {
  useEffect,
  useState,
} from "react";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] =
    useState(initialForm);
  const [isSending, setIsSending] =
    useState(false);
  const [showToast, setShowToast] =
    useState(false);

  useEffect(() => {
    if (!showToast) {
      return undefined;
    }

    const toastTimer = window.setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () =>
      window.clearTimeout(toastTimer);
  }, [showToast]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    setIsSending(true);
    setShowToast(false);

    window.setTimeout(() => {
      setIsSending(false);
      setFormData(initialForm);
      setShowToast(true);
    }, 1500);
  };

  return (
    <>
      <section
        id="contact"
        className="bg-[#1a3a2a] py-28"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[4px] text-yellow-400">
            Contact Us
          </p>

          <h2 className="mb-6 text-5xl font-black text-white">
            Get In Touch
          </h2>

          <p className="mb-12 text-lg text-white/60">
            Have questions or feedback? We'd love to hear from you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-yellow-300/60 focus:bg-white/15"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-yellow-300/60 focus:bg-white/15"
              />
            </div>

            <textarea
              rows="6"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-yellow-300/60 focus:bg-white/15"
            />

            <button
              type="submit"
              disabled={isSending}
              className={`rounded-xl px-10 py-4 font-black text-[#1a3a2a] transition ${
                isSending
                  ? "cursor-not-allowed bg-yellow-200"
                  : "bg-yellow-400 hover:bg-yellow-300"
              }`}
            >
              {isSending
                ? "Sending..."
                : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {showToast && (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto w-fit max-w-[calc(100vw-2rem)] rounded-2xl bg-[#1d6a42] px-5 py-3 text-sm text-white shadow-lg sm:bottom-6 sm:right-6 sm:left-auto sm:mx-0">
          Message sent successfully.
        </div>
      )}
    </>
  );
};

export default Contact;
