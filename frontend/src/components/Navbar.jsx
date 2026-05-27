import React from "react";

import {
  ChevronDown,
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
  },
  {
    code: "pa",
    label: "Punjabi",
  },
  {
    code: "ml",
    label: "Malayalam",
  },
];

export default function Navbar({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onBackHome,
  onNewChat,
}) {
  const showNewChat =
    activeTab === "text";

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
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active =
                  activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setActiveTab(tab.id)
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
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(
                      e.target.value
                    )
                  }
                  className="appearance-none rounded-full border border-white/10 bg-white/5 px-4 py-2 pr-10 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      className="text-[#102217]"
                    >
                      {lang.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                />
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
