import React, { useState } from "react";
import "./landing_page.css";

import {
  MessageSquare,
  Globe,
  Leaf,
  Menu,
  X,
  Send,
} from "lucide-react";

function LandingPage() {
  const [language, setLanguage] = useState("en");
  const [showChat, setShowChat] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const content = {
    en: {
      logo: "KrishiAI",
      about: "About",
      how: "How To Use",
      features: "Features",
      heroTitle: "Smart AI Assistant For Farmers",
      heroDesc:
        "Get instant agriculture guidance, crop suggestions, disease detection, government schemes and farming support using AI.",
      tryBtn: "Try It Now",
      aboutTitle: "About KrishiAI",
      aboutDesc:
        "KrishiAI helps farmers using AI-powered agriculture solutions.",
      howTitle: "How To Use",
      step1: "Ask farming related questions",
      step2: "Upload crop images",
      step3: "Get AI-powered solutions instantly",
      featureTitle: "Features",
      feature1: "Crop Recommendations",
      feature2: "Disease Detection",
      feature3: "Government Schemes",
      chatTitle: "KrishiAI Assistant",
      placeholder: "Ask something...",
    },

    pa: {
      logo: "ਕ੍ਰਿਸ਼ੀAI",
      about: "ਜਾਣਕਾਰੀ",
      how: "ਵਰਤੋਂ",
      features: "ਫੀਚਰ",
      heroTitle: "ਕਿਸਾਨਾਂ ਲਈ ਸਮਾਰਟ AI ਸਹਾਇਕ",
      heroDesc:
        "AI ਨਾਲ ਖੇਤੀਬਾੜੀ ਸਲਾਹ, ਬਿਮਾਰੀ ਪਛਾਣ ਅਤੇ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",
      tryBtn: "ਹੁਣੇ ਵਰਤੋਂ",
      aboutTitle: "ਕ੍ਰਿਸ਼ੀAI ਬਾਰੇ",
      aboutDesc:
        "ਕ੍ਰਿਸ਼ੀAI ਕਿਸਾਨਾਂ ਲਈ AI ਅਧਾਰਿਤ ਸਹਾਇਤਾ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
      howTitle: "ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ",
      step1: "ਖੇਤੀਬਾੜੀ ਸਵਾਲ ਪੁੱਛੋ",
      step2: "ਫਸਲ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
      step3: "AI ਹੱਲ ਪ੍ਰਾਪਤ ਕਰੋ",
      featureTitle: "ਫੀਚਰ",
      feature1: "ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ",
      feature2: "ਬਿਮਾਰੀ ਪਛਾਣ",
      feature3: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
      chatTitle: "ਕ੍ਰਿਸ਼ੀAI ਸਹਾਇਕ",
      placeholder: "ਕੁਝ ਪੁੱਛੋ...",
    },
  };

  const t = content[language];

  if (showChat) {
    return (
      <div className="chat-page">
        <div className="chat-header">
          <div className="logo">
            <Leaf />
            <h2>{t.chatTitle}</h2>
          </div>

          <button
            className="lang-btn"
            onClick={() =>
              setLanguage(language === "en" ? "pa" : "en")
            }
          >
            <Globe size={18} />
            {language === "en" ? "ਪੰਜਾਬੀ" : "English"}
          </button>
        </div>

        <div className="chat-body">
          <div className="message">
            👋{" "}
            {language === "en"
              ? "Hello! How can I help you today?"
              : "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"}
          </div>
        </div>

        <div className="chat-input">
          <input type="text" placeholder={t.placeholder} />

          <button>
            <Send />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <Leaf />
          <h2>{t.logo}</h2>
        </div>

        <nav className={menuOpen ? "nav active" : "nav"}>
          <a href="#about">{t.about}</a>
          <a href="#how">{t.how}</a>
          <a href="#features">{t.features}</a>

          <button
            className="lang-btn"
            onClick={() =>
              setLanguage(language === "en" ? "pa" : "en")
            }
          >
            <Globe size={18} />
            {language === "en" ? "ਪੰਜਾਬੀ" : "English"}
          </button>
        </nav>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <h1>{t.heroTitle}</h1>

          <p>{t.heroDesc}</p>

          <button
            className="try-btn"
            onClick={() => setShowChat(true)}
          >
            <MessageSquare />
            {t.tryBtn}
          </button>
        </div>

        <div className="hero-right">
          <div className="feature-card">
            🌱 AI Crop Recommendation
          </div>

          <div className="feature-card">
            🦠 Disease Detection
          </div>

          <div className="feature-card">
            📜 Government Schemes
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <h2>{t.aboutTitle}</h2>
        <p>{t.aboutDesc}</p>
      </section>

      {/* How */}
      <section className="section" id="how">
        <h2>{t.howTitle}</h2>

        <div className="cards">
          <div className="card">{t.step1}</div>
          <div className="card">{t.step2}</div>
          <div className="card">{t.step3}</div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <h2>{t.featureTitle}</h2>

        <div className="cards">
          <div className="card">{t.feature1}</div>
          <div className="card">{t.feature2}</div>
          <div className="card">{t.feature3}</div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;