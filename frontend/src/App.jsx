import React, { useState } from "react";

import Navbar from "./components/Navbar";
import TextChat from "./components/TextChat";
import ImageUpload from "./components/ImageUpload";

import LandingNavbar from "./components/landing/LandingNavbar";
import Hero from "./components/landing/Hero";
import About from "./components/landing/About";
import DiseaseSection from "./components/landing/DiseaseSection";
import HowItWorks from "./components/landing/HowItWorks";
import ComingSoon from "./components/landing/ComingSoon";
import Contact from "./components/landing/Contact";
import Footer from "./components/landing/Footer";

const APP_TABS = {
  text: "text",
  image: "image",
};

export default function App() {
  const [showApp, setShowApp] = useState(false);
  const [activeTab, setActiveTab] = useState(APP_TABS.text);
  const [language, setLanguage] = useState("en");
  const [chatResetCount, setChatResetCount] = useState(0);

  const openApp = (tab = APP_TABS.text) => {
    const nextTab =
      tab === APP_TABS.image
        ? APP_TABS.image
        : APP_TABS.text;

    setActiveTab(nextTab);
    setShowApp(true);
  };

  const returnHome = () => {
    setActiveTab(APP_TABS.text);
    setChatResetCount(0);
    setShowApp(false);
  };

  const handleNewChat = () => {
    setActiveTab(APP_TABS.text);
    setChatResetCount((count) =>
      count + 1
    );
  };

  if (!showApp) {
    return (
      <div className="overflow-x-hidden bg-[#faf7f0]">
        <LandingNavbar />
        <Hero openApp={openApp} />
        <About />
        <DiseaseSection />
        <HowItWorks />
        <ComingSoon />
        <Contact />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1e6]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onBackHome={returnHome}
        onNewChat={handleNewChat}
      />

      <main>
        {activeTab === APP_TABS.text && (
          <TextChat
            language={language}
            resetSignal={chatResetCount}
          />
        )}

        {activeTab === APP_TABS.image && (
          <ImageUpload language={language} />
        )}
      </main>
    </div>
  );
}
