// src/components/EscalationBanner.jsx

import React from "react";

import {
  AlertTriangle,
} from "lucide-react";

export default function EscalationBanner() {
  return (
    <div
      className="
        mt-4
        bg-[#FEF3C7]
        border border-[#D97706]/30
        rounded-2xl
        p-4
        flex
        items-start
        gap-3
        shadow-sm
      "
    >

      {/* ICON */}

      <div
        className="
          w-9
          h-9
          rounded-full
          bg-[#D97706]/10
          flex
          items-center
          justify-center
          flex-shrink-0
        "
      >
        <AlertTriangle
          size={18}
          className="text-[#D97706]"
        />
      </div>

      {/* TEXT */}

      <div>

        <h3
          className="
            text-sm
            font-semibold
            text-[#92400E]
          "
        >
          Escalated to Agricultural Officer
        </h3>

        <p
          className="
            text-sm
            text-[#92400E]
            mt-1
            leading-relaxed
          "
        >
          This query has been escalated
          to a local agri officer for
          expert review.
        </p>

      </div>
    </div>
  );
}