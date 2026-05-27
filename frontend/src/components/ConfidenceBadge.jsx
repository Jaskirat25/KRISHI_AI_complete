import React from "react";

import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function ConfidenceBadge({
  confidence,
}) {
  if (confidence > 0.75) {
    return (
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-[#1d6a42]">
        <CheckCircle2 size={16} />
        <span>High confidence</span>
      </div>
    );
  }

  if (
    confidence >= 0.5 &&
    confidence <= 0.75
  ) {
    return (
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-medium text-[#b7791f]">
        <AlertTriangle size={16} />
        <span>Medium confidence</span>
      </div>
    );
  }

  return (
    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-sm font-medium text-[#c23d3d]">
      <ShieldAlert size={16} />
      <span>Low confidence</span>
    </div>
  );
}
