import React, {
  useEffect,
  useState,
} from "react";

import {
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

export default function FeedbackButtons() {
  const [toast, setToast] =
    useState(false);
  const [feedbackType, setFeedbackType] =
    useState("");

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);

    return () =>
      clearTimeout(timer);
  }, [toast]);

  const handleFeedback = (type) => {
    setFeedbackType(type);
    setToast(true);
  };

  return (
    <>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            handleFeedback("positive")
          }
          className="inline-flex items-center gap-2 rounded-full border border-[#d7e5d2] bg-white px-3 py-2 text-sm text-[#5f7164] transition-all duration-200 hover:border-[#abd19d] hover:bg-green-50 hover:text-[#1d6a42]"
        >
          <ThumbsUp size={16} />
          Helpful
        </button>

        <button
          type="button"
          onClick={() =>
            handleFeedback("negative")
          }
          className="inline-flex items-center gap-2 rounded-full border border-[#e8d8d8] bg-white px-3 py-2 text-sm text-[#6e5a5a] transition-all duration-200 hover:border-[#e5b5b5] hover:bg-red-50 hover:text-[#c23d3d]"
        >
          <ThumbsDown size={16} />
          Improve
        </button>
      </div>

      {toast && (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto w-fit max-w-[calc(100vw-2rem)] rounded-2xl bg-[#1d6a42] px-5 py-3 text-sm text-white shadow-lg sm:bottom-6 sm:right-6 sm:left-auto sm:mx-0">
          {feedbackType === "positive"
            ? "Thanks for the feedback."
            : "Feedback received. We will improve this response."}
        </div>
      )}
    </>
  );
}
