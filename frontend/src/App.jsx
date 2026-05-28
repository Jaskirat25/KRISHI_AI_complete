import React, { useEffect, useState } from "react";

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

const APP_ROUTES = {
  home: "/",
  text: "/chat",
  image: "/detect-disease",
};

const normalizePath = (pathname = APP_ROUTES.home) => {
  if (!pathname || pathname === APP_ROUTES.home) {
    return APP_ROUTES.home;
  }

  return pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
};

const getTabFromPath = (pathname) => {
  const normalizedPath =
    normalizePath(pathname);

  if (normalizedPath === APP_ROUTES.image) {
    return APP_TABS.image;
  }

  if (normalizedPath === APP_ROUTES.text) {
    return APP_TABS.text;
  }

  return null;
};

export default function App() {
  const [pathname, setPathname] = useState(() => {
    if (typeof window === "undefined") {
      return APP_ROUTES.home;
    }

    return normalizePath(
      window.location.pathname
    );
  });
  const [language, setLanguage] = useState("en");
  const [chatResetCount, setChatResetCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handlePopState = () => {
      setPathname(
        normalizePath(window.location.pathname)
      );
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      pathname === APP_ROUTES.home ||
      getTabFromPath(pathname)
    ) {
      return;
    }

    window.history.replaceState(
      {},
      "",
      APP_ROUTES.home
    );
    setPathname(APP_ROUTES.home);
  }, [pathname]);

  const navigateTo = (nextPath) => {
    const normalizedPath =
      normalizePath(nextPath);

    if (typeof window !== "undefined") {
      const currentPath = normalizePath(
        window.location.pathname
      );

      if (currentPath !== normalizedPath) {
        window.history.pushState(
          {},
          "",
          normalizedPath
        );
      }
    }

    setPathname(normalizedPath);
  };

  const openApp = (tab = APP_TABS.text) => {
    navigateTo(
      tab === APP_TABS.image
        ? APP_ROUTES.image
        : APP_ROUTES.text
    );
  };

  const returnHome = () => {
    setChatResetCount(0);
    navigateTo(APP_ROUTES.home);
  };

  const handleNewChat = () => {
    navigateTo(APP_ROUTES.text);
    setChatResetCount((count) =>
      count + 1
    );
  };

  const activeTab = getTabFromPath(pathname);
  const showApp = Boolean(activeTab);

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
        onTabChange={openApp}
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
