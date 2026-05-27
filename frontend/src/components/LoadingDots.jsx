// src/components/LoadingDots.jsx

import React from "react";

export default function LoadingDots() {
  return (
    <div className="flex items-center gap-1">

      {/* DOT 1 */}

      <span
        className="
          w-2
          h-2
          rounded-full
          bg-[#16A34A]
          animate-bounce-dot
          [animation-delay:0ms]
        "
      />

      {/* DOT 2 */}

      <span
        className="
          w-2
          h-2
          rounded-full
          bg-[#16A34A]
          animate-bounce-dot
          [animation-delay:150ms]
        "
      />

      {/* DOT 3 */}

      <span
        className="
          w-2
          h-2
          rounded-full
          bg-[#16A34A]
          animate-bounce-dot
          [animation-delay:300ms]
        "
      />

    </div>
  );
}