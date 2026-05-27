import React, {
  useEffect,
  useState,
} from "react";

import {
  CheckCircle2,
  ImagePlus,
  Microscope,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

import {
  analyseImage,
} from "../api/krishiApi";

import ConfidenceBadge from "./ConfidenceBadge";
import FeedbackButtons from "./FeedbackButtons";

const uploadTips = [
  "Capture the leaf clearly in daylight.",
  "Keep one main affected area in focus.",
  "Avoid blurry or very dark photos.",
];

export default function ImageUpload() {
  const [image, setImage] =
    useState(null);
  const [preview, setPreview] =
    useState("");
  const [loading, setLoading] =
    useState(false);
  const [result, setResult] =
    useState(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImage = (file) => {
    if (!file) {
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(
      URL.createObjectURL(file)
    );
    setResult(null);
  };

  const submitImage = async () => {
    if (!image) {
      return;
    }

    setLoading(true);

    try {
      const data =
        await analyseImage(image);

      setResult(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");
    setResult(null);
  };

  const confidencePercent =
    result
      ? Number(result.confidence) *
        100
      : 0;

  const isHealthy =
    result?.prediction
      ?.toLowerCase()
      .includes("healthy");

  const statusTone = isHealthy
    ? {
        badge:
          "bg-[#e7f7e5] text-[#1d6a42]",
        panel:
          "from-[#eef9ea] to-white",
        title: "Healthy crop signal",
        subtitle:
          "The model sees a healthy pattern in this image.",
      }
    : {
        badge:
          "bg-[#fde8e8] text-[#c23d3d]",
        panel:
          "from-[#fff4e7] to-white",
        title: "Disease risk detected",
        subtitle:
          "The image shows signs that may need treatment attention.",
      };

  const nextSteps = isHealthy
    ? [
        "Continue regular irrigation and nutrient care.",
        "Monitor the same plant for new spots over the next few days.",
        "Upload another image if symptoms start spreading.",
      ]
    : [
        "Inspect nearby leaves for similar symptoms.",
        "Separate severely affected plants if the spread is fast.",
        "Use the chat screen for treatment and prevention guidance.",
      ];

  if (!result) {
    return (
      <section className="min-h-[calc(100vh-88px)] bg-[radial-gradient(circle_at_top_left,rgba(29,106,66,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_32%),linear-gradient(180deg,#f6f1e6_0%,#eef8ee_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-6 grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
            <div className="rounded-[30px] border border-white/70 bg-white/78 p-6 shadow-[0_18px_60px_rgba(16,34,23,0.08)] backdrop-blur sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#eff8dc] px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#47652e]">
                <Microscope size={14} />
                Image Detection
              </div>

              <h2 className="mt-5 text-3xl font-black text-[#123524] sm:text-4xl">
                Upload a crop image and detect disease faster
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52685a] sm:text-base">
                This workspace is built for quick field checks. Add one clear
                photo of a leaf or crop area and KrishiAI will return a disease
                prediction with confidence.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[28px] border border-[#dcebd8] bg-[#fbfdf8] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6c874f]">
                  Best Result
                </p>
                <p className="mt-3 text-sm font-medium leading-7 text-[#173524]">
                  Use a close, sharp image with one visible symptom area.
                </p>
              </div>

              <div className="rounded-[28px] border border-[#dcebd8] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6c874f]">
                  Works Well For
                </p>
                <p className="mt-3 text-sm font-medium leading-7 text-[#173524]">
                  Quick disease checks before asking follow-up questions in chat.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-[32px] border border-[#dcebd8] bg-white/80 p-5 shadow-[0_18px_60px_rgba(16,34,23,0.1)] backdrop-blur sm:p-6 lg:p-8">
              <label className="block">
                <div className="group relative flex min-h-[320px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[28px] border-2 border-dashed border-[#7eb48f] bg-[linear-gradient(180deg,rgba(239,248,220,0.85),rgba(255,255,255,0.95))] p-6 text-center transition hover:border-[#1d6a42]">
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Crop preview"
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          reset();
                        }}
                        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#173524] shadow-md transition hover:scale-105"
                      >
                        <X size={18} />
                      </button>

                      <div className="relative mt-auto w-full rounded-[24px] bg-white/92 p-4 text-left backdrop-blur">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c874f]">
                          Ready To Analyze
                        </p>
                        <p className="mt-2 text-base font-semibold text-[#173524]">
                          {image?.name ||
                            "Selected crop image"}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white text-[#1d6a42] shadow-sm">
                        <ImagePlus size={34} />
                      </div>

                      <h3 className="mt-6 text-2xl font-black text-[#123524]">
                        Drop your crop photo here
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-7 text-[#5d7264] sm:text-base">
                        Tap to browse from your device or drag and drop a JPG or
                        PNG image.
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#dcebd8] bg-white px-4 py-2 text-sm font-semibold text-[#173524] shadow-sm">
                        <Upload size={16} />
                        Supports JPG and PNG up to 10MB
                      </div>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    hidden
                    onChange={(e) =>
                      handleImage(
                        e.target.files?.[0]
                      )
                    }
                  />
                </div>
              </label>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={submitImage}
                  disabled={!image || loading}
                  className="inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-[#1d6a42] px-6 py-4 text-base font-semibold text-white shadow-[0_16px_32px_rgba(29,106,66,0.22)] transition hover:bg-[#175a38] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Microscope size={20} />
                      Analyze Disease
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={reset}
                  disabled={!image && !preview}
                  className="inline-flex items-center justify-center rounded-full border border-[#1d6a42] px-6 py-4 text-base font-semibold text-[#1d6a42] transition hover:bg-[#eef8ee] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Clear Image
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[32px] border border-[#dcebd8] bg-white/78 p-6 shadow-[0_18px_60px_rgba(16,34,23,0.08)] backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6c874f]">
                  Photo Tips
                </p>

                <div className="mt-5 space-y-4">
                  {uploadTips.map((tip) => (
                    <div
                      key={tip}
                      className="flex items-start gap-3 rounded-2xl border border-[#e5eee2] bg-[#fbfdf8] p-4"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eff8dc] text-[#47652e]">
                        <CheckCircle2
                          size={16}
                        />
                      </div>

                      <p className="text-sm leading-7 text-[#173524]">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-[#dcebd8] bg-[#123524] p-6 text-white shadow-[0_18px_60px_rgba(16,34,23,0.16)]">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
                  <ShieldCheck size={14} />
                  Pro Tip
                </div>

                <h3 className="mt-4 text-2xl font-black">
                  Need treatment advice after detection?
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/75">
                  After you get the prediction here, switch to the chat tab and
                  ask for treatment, prevention, or recovery guidance for the
                  detected disease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-88px)] bg-[radial-gradient(circle_at_top_left,rgba(29,106,66,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_32%),linear-gradient(180deg,#f6f1e6_0%,#eef8ee_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className={`rounded-[32px] border border-[#dcebd8] bg-gradient-to-br ${statusTone.panel} p-6 shadow-[0_18px_60px_rgba(16,34,23,0.08)]`}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${statusTone.badge}`}>
                {statusTone.title}
              </div>

              <h2 className="mt-4 text-3xl font-black text-[#123524] sm:text-4xl">
                {result.prediction}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#52685a] sm:text-base">
                {statusTone.subtitle}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6c874f]">
                Model Confidence
              </p>
              <p className="mt-2 text-4xl font-black text-[#123524]">
                {confidencePercent.toFixed(
                  1
                )}
                %
              </p>
              <div className="mt-3">
                <ConfidenceBadge
                  confidence={
                    confidencePercent /
                    100
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[32px] border border-[#dcebd8] bg-white/85 shadow-[0_18px_60px_rgba(16,34,23,0.08)] backdrop-blur">
              <img
                src={preview}
                alt="Detected crop"
                className="h-full max-h-[420px] w-full object-cover"
              />
            </div>

            <div className="rounded-[32px] border border-[#dcebd8] bg-white/78 p-5 shadow-[0_18px_60px_rgba(16,34,23,0.08)] backdrop-blur">
              <button
                type="button"
                onClick={reset}
                className="inline-flex w-full items-center justify-center rounded-full border border-[#1d6a42] px-6 py-4 text-base font-semibold text-[#1d6a42] transition hover:bg-[#eef8ee]"
              >
                Upload Another Image
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-[#dcebd8] bg-white/82 p-6 shadow-[0_18px_60px_rgba(16,34,23,0.08)] backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6c874f]">
                Confidence Meter
              </p>

              <div className="mt-5 h-4 overflow-hidden rounded-full bg-[#e4ece0]">
                <div
                  style={{
                    width: `${confidencePercent}%`,
                  }}
                  className={`h-full rounded-full transition-all duration-700 ${
                    confidencePercent > 80
                      ? "bg-[#1d6a42]"
                      : confidencePercent >=
                        60
                      ? "bg-[#d2a436]"
                      : "bg-[#c23d3d]"
                  }`}
                />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-[#e5eee2] bg-[#fbfdf8] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c874f]">
                    Prediction
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#173524]">
                    {result.prediction}
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#e5eee2] bg-[#fbfdf8] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c874f]">
                    Status
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#173524]">
                    {isHealthy
                      ? "Healthy"
                      : "Needs review"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-[#dcebd8] bg-white/82 p-6 shadow-[0_18px_60px_rgba(16,34,23,0.08)] backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6c874f]">
                Suggested Next Steps
              </p>

              <div className="mt-5 space-y-4">
                {nextSteps.map((step) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 rounded-2xl border border-[#e5eee2] bg-[#fbfdf8] p-4"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eff8dc] text-[#47652e]">
                      <CheckCircle2
                        size={16}
                      />
                    </div>

                    <p className="text-sm leading-7 text-[#173524]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <FeedbackButtons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
