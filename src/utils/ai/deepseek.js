const axios = require('axios');

async function deepseek(text) {
  if (!text) throw new Error('Tolong tulis pertanyaan!');

  try {
    const apiUrl = `https://elrayyxml.my.id/ai/deepseek?text=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    return {
      choices: [
        {
          message: { content: data.result }
        }
      ]
    };
  } catch (err) {
    console.error('DeepSeek Error:', err.message);
    throw new Error('Terjadi kesalahan saat memanggil DeepSeek');
  }
}

module.exports = { deepseek };
