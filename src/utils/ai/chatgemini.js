const axios = require("axios");

/**
 * Kirim pesan ke TurboChat Gemini API
 * @param {string} prompt - Pesan / prompt yang ingin dikirim
 * @param {string} language - Bahasa yang digunakan (default: en)
 * @param {object} cookies - Optional: object cookie key-value
 * @returns {Promise<object>} - Response sebagai objek JS
 */
async function sendMessage(prompt, language = "en", cookies = {}) {
  try {
    const cookieString = Object.entries(cookies)
      .map(([k, v]) => `${k}=${v}`)
      .join("; ");

    const response = await axios.post(
      "https://theturbochat.com/chatgemini",
      { prompt, language },
      {
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://theturbochat.com",
          "Referer": "https://theturbochat.com/gemini",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36",
          ...(cookieString ? { Cookie: cookieString } : {})
        }
      }
    );

    let replyText = response.data.reply || JSON.stringify(response.data);
    try {
      const parsed = JSON.parse(replyText);
      if (parsed.generatedText) replyText = parsed.generatedText;
    } catch (e) {}

    return {
      choices: [
        {
          message: { content: replyText }
        }
      ]
    };
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendMessage };
