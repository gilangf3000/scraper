const axios = require("axios");

async function sendMessage(message, model = "gpt-3.5-turbo", language = "en") {
  try {
    const response = await axios.post(
      "https://theturbochat.com/chat",
      { message, model, language },
      {
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://theturbochat.com"
        }
      }
    );

    const data = response.data;
    return {
      choices: [
        {
          message: { content: data.choices[0].message.content }
        }
      ]
    };
  } catch (error) {
    console.error("Error sending message:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendMessage };
