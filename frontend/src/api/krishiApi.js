// src/api/krishiApi.js

import axios from "axios";

// =====================================
// BASE URL
// =====================================

const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://127.0.0.1:8000/api";

// =====================================
// AXIOS INSTANCE
// =====================================

const api = axios.create({
  baseURL: BASE_URL,
});

// =====================================
// TEXT API
// POST /text
// =====================================

export const sendTextMessage =
  async (text, language) => {

    const response =
      await api.post("/text", {
        text,
        language,
      });

    return response.data;
  };

// =====================================
// IMAGE API
// POST /image
// =====================================

export const analyseImage =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post(
        "/image",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

// =====================================
// VOICE API
// POST /voice
// =====================================

export const sendVoiceMessage =
  async (audioBlob) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      audioBlob,
      "voice.webm"
    );

    const response =
      await api.post(

        "/voice",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    // return json
    return response.data;
  };
export default api;