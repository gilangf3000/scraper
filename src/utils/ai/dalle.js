const axios = require("axios");

/**
 * Generate image via TurboChat DALL·E API
 * @param {string} prompt - Deskripsi gambar
 * @param {string} language - Bahasa yang digunakan (default: en)
 * @returns {Promise<any>} - Hasil response dari API
 */
async function generateImage(prompt, language = "en") {
  try {
    const response = await axios.post(
      "https://theturbochat.com/dalle",
      { message: prompt, language },
      {
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://theturbochat.com",
          "Referer": "https://theturbochat.com/generate-ai-images"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { generateImage };
