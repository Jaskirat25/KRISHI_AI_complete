import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronDown,
  House,
  MessageSquare,
  Microscope,
  Plus,
  Wheat,
} from "lucide-react";

const tabs = [
  {
    id: "text",
    label: "Chat",
    icon: MessageSquare,
  },
  {
    id: "image",
    label: "Detect Disease",
    icon: Microscope,
  },
];

const languages = [
  {
    code: "en",
    label: "English",
    description: "Available now",
    disabled: false,
  },
  {
    code: "pa",
    label: "Punjabi",
    description: "Coming soon",
    disabled: true,
  },
];

export default function Navbar({
  activeTab,
  onTabChange,
  language,
  setLanguage,
  onBackHome,
  onNewChat,
}) {
  const [showLanguageMenu, setShowLanguageMenu] =
    useState(false);
  const languageMenuRef = useRef(null);
  const showNewChat =
    activeTab === "text";
  const currentLanguage =
    languages.find(
      (option) =>
        option.code === language &&
        !option.disabled
    ) ?? languages[0];

  useEffect(() => {
    if (currentLanguage.code !== language) {
      setLanguage(currentLanguage.code);
    }
  }, [
    currentLanguage.code,
    language,
    setLanguage,
  ]);

  useEffect(() => {
    if (!showLanguageMenu) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(
          event.target
        )
      ) {
        setShowLanguageMenu(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handlePointerDown
    );
    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showLanguageMenu]);

  const handleLanguageSelect = (
    nextLanguage
  ) => {
    if (nextLanguage.disabled) {
      return;
    }

    setLanguage(nextLanguage.code);
    setShowLanguageMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-green-900 bg-[#1a3a2a]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBackHome}
              className="flex items-center gap-3 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-yellow-400 text-[#102217]">
                <Wheat size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-black text-white">
                  Krishi
                  <span className="text-yellow-400">
                    AI
                  </span>
                </h1>

                <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                  Farming Assistant
                </p>
              </div>
            </button>

            <div className="flex items-center gap-2 sm:hidden">
              {showNewChat && (
                <button
                  type="button"
                  onClick={onNewChat}
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-[#1a3a2a] transition hover:bg-yellow-300"
                >
                  <Plus size={16} />
                  New Chat
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-1 lg:justify-end">
            <div className="flex items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex min-w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                <House size={18} />
                <span>Home</span>
              </button>

              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active =
                  activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      onTabChange(tab.id)
                    }
                    className={`inline-flex min-w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-yellow-400 text-[#102217] shadow-md"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div
                ref={languageMenuRef}
                className="relative w-full sm:w-[250px]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowLanguageMenu((open) =>
                      !open
                    )
                  }
                  aria-haspopup="listbox"
                  aria-expanded={
                    showLanguageMenu
                  }
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-left text-white shadow-[0_14px_35px_rgba(9,24,17,0.2)] transition hover:border-yellow-300/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-white/45">
                      Language
                    </span>

                    <span className="mt-1 block text-sm font-semibold text-white">
                      {currentLanguage.label}
                    </span>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition ${
                      showLanguageMenu
                        ? "rotate-180 text-yellow-300"
                        : "text-white/60"
                    }`}
                  />
                </button>

                {showLanguageMenu && (
                  <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#153120] p-2 shadow-[0_26px_80px_rgba(3,12,8,0.45)]">
                    <div
                      role="listbox"
                      aria-label="Language options"
                      className="space-y-2"
                    >
                      {languages.map((lang) => {
                        const isActive =
                          currentLanguage.code ===
                          lang.code;

                        return (
                          <button
                            key={lang.code}
                            type="button"
                            disabled={
                              lang.disabled
                            }
                            onClick={() =>
                              handleLanguageSelect(
                                lang
                              )
                            }
                            className={`flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition ${
                              lang.disabled
                                ? "cursor-not-allowed border border-white/5 bg-white/[0.04] text-white/45"
                                : isActive
                                ? "bg-yellow-400 text-[#102217] shadow-[0_14px_28px_rgba(250,204,21,0.2)]"
                                : "border border-transparent bg-transparent text-white/85 hover:border-white/10 hover:bg-white/8"
                            }`}
                          >
                            <div>
                              <span className="block text-sm font-semibold">
                                {lang.label}
                              </span>

                              <span
                                className={`mt-1 block text-xs ${
                                  lang.disabled
                                    ? "text-white/40"
                                    : isActive
                                    ? "text-[#102217]/75"
                                    : "text-white/55"
                                }`}
                              >
                                {lang.description}
                              </span>
                            </div>

                            <span
                              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                                lang.disabled
                                  ? "border border-yellow-300/20 bg-yellow-300/10 text-yellow-200"
                                  : isActive
                                  ? "bg-[#102217]/10 text-[#102217]"
                                  : "border border-white/10 text-white/45"
                              }`}
                            >
                              {lang.disabled
                                ? "Soon"
                                : isActive
                                ? "Active"
                                : "Select"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {showNewChat && (
                <button
                  type="button"
                  onClick={onNewChat}
                  className="hidden items-center gap-2 rounded-full bg-yellow-400 px-5 py-2 font-bold text-[#1a3a2a] transition hover:bg-yellow-300 sm:inline-flex"
                >
                  <Plus size={16} />
                  New Chat
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
