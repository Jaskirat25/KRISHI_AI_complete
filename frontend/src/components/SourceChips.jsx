// src/components/SourceChips.jsx

import React from "react";

import {
  FileText,
} from "lucide-react";

export default function SourceChips({
  sources = [],
}) {

  // =====================================
  // NO SOURCES
  // =====================================

  if (!sources.length) {
    return null;
  }

  // =====================================
  // UI
  // =====================================

  return (
    <div className="flex flex-wrap gap-2 mt-4">

      {sources.map(
        (source, index) => (
          <div
            key={index}
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              bg-[#F3F4F6]
              border border-[#E5E7EB]
              text-[#6B7280]
              text-xs
              font-medium
              shadow-sm
            "
          >

            {/* ICON */}

            <FileText size={13} />

            {/* SOURCE NAME */}

            <span>
              {source}
            </span>

          </div>
        )
      )}

    </div>
  );
}