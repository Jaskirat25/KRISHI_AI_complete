// src/components/VoiceRecorder.jsx

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Mic,
  Loader2,
} from "lucide-react";

import {
  sendVoiceMessage,
} from "../api/krishiApi";

export default function VoiceRecorder() {

  // =====================================
  // STATES
  // =====================================

  const [recording, setRecording] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const [seconds, setSeconds] =
    useState(0);

  const [result, setResult] =
    useState(null);

  // =====================================
  // REFS
  // =====================================

  const mediaRecorderRef =
    useRef(null);

  const chunksRef =
    useRef([]);

  const timerRef =
    useRef(null);

  // =====================================
  // TIMER
  // =====================================

  useEffect(() => {

    if (recording) {

      timerRef.current =
        setInterval(() => {

          setSeconds(
            (prev) => prev + 1
          );

        }, 1000);

    } else {

      clearInterval(
        timerRef.current
      );
    }

    return () =>
      clearInterval(
        timerRef.current
      );

  }, [recording]);

  // =====================================
  // START RECORDING
  // =====================================

  const startRecording =
    async () => {

      if (recording || processing)
        return;

      try {

        setResult(null);

        console.log(
          "Starting recording..."
        );

        // =====================================
        // GET MICROPHONE
        // =====================================

        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            }
          );

        // =====================================
        // MEDIA RECORDER
        // =====================================

        const recorder =
          new MediaRecorder(stream);

        mediaRecorderRef.current =
          recorder;

        chunksRef.current = [];

        // =====================================
        // COLLECT AUDIO CHUNKS
        // =====================================

        recorder.ondataavailable =
          (e) => {

            console.log(
              "Chunk received:",
              e.data
            );

            if (
              e.data.size > 0
            ) {

              chunksRef.current.push(
                e.data
              );
            }
          };

        // =====================================
        // STOP EVENT
        // =====================================

        recorder.onstop =
          async () => {

            console.log(
              "Recording stopped"
            );

            setProcessing(true);

            try {

              // =====================================
              // CREATE AUDIO BLOB
              // =====================================

              const audioBlob =
                new Blob(
                  chunksRef.current,
                  {
                    type:
                      "audio/webm",
                  }
                );

              console.log(
                "Audio Blob:",
                audioBlob
              );

              // =====================================
              // SEND TO BACKEND
              // =====================================

              const response =
                await sendVoiceMessage(
                  audioBlob
                );

              console.log(
                "Response:",
                response
              );

              setResult({
                response:
                  response.text,
              });

            } catch (error) {

              console.log(
                "VOICE ERROR:",
                error
              );

              setResult({

                response:
                  String(error),
              });
            }

            setProcessing(false);

            setSeconds(0);

            chunksRef.current = [];
          };

        // =====================================
        // START RECORDING
        // =====================================

        recorder.start();

        setRecording(true);

      } catch (error) {

        console.log(
          "Microphone Error:",
          error
        );

        setResult({

          response:
            "Microphone access denied",
        });
      }
    };

  // =====================================
  // STOP RECORDING
  // =====================================

  const stopRecording =
    () => {

      if (!recording)
        return;

      console.log(
        "Stopping recording..."
      );

      if (
        mediaRecorderRef.current
      ) {

        mediaRecorderRef.current.stop();

        setRecording(false);
      }
    };

  // =====================================
  // FORMAT TIMER
  // =====================================

  const formatTime = (
    s
  ) => {

    const mins = String(
      Math.floor(s / 60)
    ).padStart(2, "0");

    const secs = String(
      s % 60
    ).padStart(2, "0");

    return `${mins}:${secs}`;
  };

  // =====================================
  // UI
  // =====================================

  return (

    <div
      className="
        min-h-screen
        bg-[#F0FDF4]
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          w-full
          max-w-sm
          text-center
        "
      >

        {/* MIC BUTTON */}

        <button

          onPointerDown={
            startRecording
          }

          onPointerUp={
            stopRecording
          }

          className={`
            relative
            w-32
            h-32
            rounded-full
            mx-auto
            flex
            items-center
            justify-center
            shadow-lg
            transition-all
            duration-300

            ${
              recording
                ? "bg-gradient-to-br from-red-500 to-red-700"
                : processing
                ? "bg-gray-400"
                : "bg-gradient-to-br from-green-500 to-green-700"
            }
          `}
        >

          {processing ? (

            <Loader2
              size={50}
              className="
                text-white
                animate-spin
              "
            />

          ) : recording ? (

            <span className="text-5xl">
              🔴
            </span>

          ) : (

            <Mic
              size={50}
              className="text-white"
            />
          )}

          {recording && (

            <div
              className="
                absolute
                inset-0
                border-4
                border-red-300
                rounded-full
                animate-ping
              "
            />
          )}

        </button>

        {/* LABEL */}

        <p
          className="
            mt-5
            text-sm
            text-[#6B7280]
          "
        >

          {recording
            ? "Recording... release to send"
            : processing
            ? "Processing your question..."
            : "Hold to speak"}

        </p>

        {/* TIMER */}

        {recording && (

          <p
            className="
              mt-2
              text-2xl
              font-bold
              text-[#DC2626]
            "
          >
            {formatTime(seconds)}
          </p>
        )}

        {/* RESULT */}

        {result && (

          <div
            className="
              mt-8
              bg-white
              rounded-2xl
              shadow-lg
              p-5
              text-left
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#16A34A]
                  flex
                  items-center
                  justify-center
                  text-white
                "
              >
                🌾
              </div>

              <h3 className="font-bold">
                Voice Assistant
              </h3>

            </div>

            <p
              className="
                mt-4
                text-[#111827]
                whitespace-pre-line
              "
            >
              {result.response}
            </p>

            <button

              onClick={() =>
                setResult(null)
              }

              className="
                w-full
                mt-6
                bg-[#16A34A]
                hover:bg-[#15803D]
                text-white
                py-3
                rounded-2xl
                transition
              "
            >
              Ask Again
            </button>

          </div>
        )}

      </div>
      

    </div>
  ); 
}