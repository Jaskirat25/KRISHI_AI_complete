import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUpRight,
  Leaf,
  Send,
  Sparkles,
} from "lucide-react";

import {
  sendTextMessage,
} from "../api/krishiApi";

import FeedbackButtons from "./FeedbackButtons";
import LoadingDots from "./LoadingDots";

const placeholders = {
  en: "Ask about your crop, disease symptoms, or treatment plan...",
  pa: "Apni fasal, bimaari ya ilaaj baare pucho...",
  ml: "Ask your farming question here...",
};

const quickPrompts = [
  {
    title: "Disease symptoms",
    prompt:
      "My wheat leaves have yellow spots. What could it be?",
  },
  {
    title: "Crop treatment",
    prompt:
      "Give me simple treatment steps for a fungal disease in rice.",
  },
  {
    title: "Prevention tips",
    prompt:
      "How can I prevent disease spread after heavy rain in my field?",
  },
];

export default function TextChat({
  language,
  resetSignal,
}) {
  const [messages, setMessages] =
    useState([]);
  const [input, setInput] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const conversationIdRef =
    useRef(0);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    conversationIdRef.current += 1;
    setMessages([]);
    setInput("");
    setLoading(false);

    if (textareaRef.current) {
      textareaRef.current.style.height =
        "auto";
    }
  }, [resetSignal]);

  const resetComposerHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height =
        "auto";
    }
  };

  const pushAssistantMessage = (
    response
  ) => {
    const localizedAnswer =
      language === "pa" &&
      response.answer_in_punjabi
        ? response.answer_in_punjabi
        : response.answer;

    setMessages((prev) => [
      ...prev,
      {
        type: "ai",
        answer:
          localizedAnswer ||
          "Unable to generate a response right now.",
      },
    ]);
  };

  const sendPrompt = async (prompt) => {
    const trimmedPrompt =
      prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: trimmedPrompt,
      },
    ]);

    const requestConversationId =
      conversationIdRef.current;

    setLoading(true);

    try {
      const response =
        await sendTextMessage(
          trimmedPrompt,
          language
        );

      if (
        requestConversationId !==
        conversationIdRef.current
      ) {
        return;
      }

      pushAssistantMessage(response);
    } catch (error) {
      console.log(error);

      if (
        requestConversationId !==
        conversationIdRef.current
      ) {
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          answer:
            "Unable to connect to the server. Please try again.",
        },
      ]);
    } finally {
      if (
        requestConversationId !==
        conversationIdRef.current
      ) {
        return;
      }

      setLoading(false);
      setInput("");
      resetComposerHeight();
    }
  };

  const handleSend = async () => {
    await sendPrompt(input);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleSend();
    }
  };

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(
      e.target.scrollHeight,
      160
    )}px`;
  };

  const applyPrompt = (prompt) => {
    setInput(prompt);

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.style.height =
          "auto";
        textareaRef.current.style.height = `${Math.min(
          textareaRef.current
            .scrollHeight,
          160
        )}px`;
      }
    });
  };

  return (
    <section className="min-h-[calc(100vh-88px)] bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.16),transparent_32%),linear-gradient(180deg,#f6f1e6_0%,#eef8ee_100%)]">
      <div className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl flex-col px-4 pb-6 pt-5 sm:px-6 lg:px-8">
        <div className="mb-5 rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_18px_60px_rgba(16,34,23,0.08)] backdrop-blur xl:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eff8dc] px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#47652e]">
                <Sparkles size={14} />
                Smart Crop Chat
              </div>

              <h2 className="text-3xl font-black text-[#123524] sm:text-4xl">
                Ask KrishiAI anything about your crop
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#4d6354] sm:text-base">
                Get quick help for disease symptoms, preventive care, and
                treatment planning in a clean chat workspace that works on any
                screen size.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#d9ead3] bg-[#f7fbef] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6c874f]">
                  Best For
                </p>
                <p className="mt-2 text-sm font-medium text-[#173524]">
                  Follow-up questions and treatment advice
                </p>
              </div>

              <div className="rounded-2xl border border-[#d6e6d9] bg-white px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6c874f]">
                  Current Language
                </p>
                <p className="mt-2 text-sm font-medium capitalize text-[#173524]">
                  {language === "en"
                    ? "English"
                    : language === "pa"
                    ? "Punjabi"
                    : "Malayalam"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-[32px] border border-[#dcebd8] bg-white/75 shadow-[0_20px_80px_rgba(16,34,23,0.1)] backdrop-blur">
          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
            {messages.length === 0 && !loading ? (
              <div className="flex min-h-full flex-col justify-center">
                <div className="mx-auto max-w-3xl text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#eff8dc] to-[#f9e7a5] text-[#1a3a2a] shadow-sm">
                    <Leaf size={28} />
                  </div>

                  <h3 className="mt-6 text-3xl font-black text-[#123524] sm:text-4xl">
                    Start a fresh farming conversation
                  </h3>

                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5b6e61] sm:text-base">
                    Choose a quick prompt below or type your own question. The
                    chat is now focused on one clean conversation without the
                    old left sidebar.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-3">
                  {quickPrompts.map(
                    (item) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() =>
                          applyPrompt(
                            item.prompt
                          )
                        }
                        className="group rounded-[28px] border border-[#dcebd8] bg-[#fbfdf8] p-5 text-left transition hover:-translate-y-1 hover:border-[#b8d5b4] hover:bg-white"
                      >
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#eff8dc] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#557340]">
                          {item.title}
                        </div>

                        <p className="mt-4 text-base font-semibold leading-7 text-[#173524]">
                          {item.prompt}
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5d7f48]">
                          Use this prompt
                          <ArrowUpRight
                            size={16}
                            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
                {messages.map(
                  (
                    message,
                    index
                  ) =>
                    message.type ===
                    "user" ? (
                      <div
                        key={index}
                        className="flex justify-end"
                      >
                        <div className="max-w-[88%] rounded-[28px] rounded-br-md bg-[#1d6a42] px-4 py-3 text-sm leading-7 text-white shadow-[0_16px_36px_rgba(29,106,66,0.22)] sm:max-w-[78%] sm:px-5 sm:text-base">
                          {message.text}
                        </div>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="flex items-start gap-3 sm:gap-4"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2a7a4d] to-[#ecc94c] text-[#102217] shadow-sm">
                          <Leaf size={20} />
                        </div>

                        <div className="max-w-[92%] rounded-[28px] rounded-tl-md border border-[#dfeadd] bg-[#fbfdf8] px-4 py-4 shadow-sm sm:max-w-[80%] sm:px-5">
                          <p className="whitespace-pre-wrap text-sm leading-7 text-[#1f2f27] sm:text-base">
                            {message.answer}
                          </p>

                          <FeedbackButtons />
                        </div>
                      </div>
                    )
                )}

                {loading && (
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2a7a4d] to-[#ecc94c] text-[#102217] shadow-sm">
                      <Leaf size={20} />
                    </div>

                    <div className="rounded-[28px] rounded-tl-md border border-[#dfeadd] bg-[#fbfdf8] px-4 py-4 shadow-sm">
                      <LoadingDots />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="sticky bottom-0 border-t border-[#e4ede1] bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 rounded-[30px] border border-[#dcebd8] bg-[#f9fcf4] p-3 shadow-[0_12px_40px_rgba(16,34,23,0.06)] sm:flex-row sm:items-end sm:gap-4">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onInput={autoResize}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={
                  placeholders[
                    language
                  ] ||
                  placeholders.en
                }
                className="min-h-[56px] flex-1 resize-none bg-transparent px-3 py-3 text-sm leading-7 text-[#173524] placeholder:text-[#7b8f80] focus:outline-none sm:text-base"
              />

              <div className="flex items-center justify-between gap-3">
                <p className="pl-3 text-xs text-[#7b8f80] sm:hidden">
                  Press Enter to send
                </p>

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={
                    !input.trim() ||
                    loading
                  }
                  className="inline-flex h-12 w-12 items-center justify-center self-end rounded-full bg-[#1d6a42] text-white shadow-[0_12px_24px_rgba(29,106,66,0.28)] transition hover:bg-[#175a38] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
