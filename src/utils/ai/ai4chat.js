const axios = require('axios');

/**
 * Generate image menggunakan AI4Chat
 * @param {string} prompt - Prompt deskripsi gambar
 * @param {string} ratio - Aspect ratio (default: '1:1')
 * @returns {Promise<string>} - URL gambar hasil generate
 */
async function ai4chat(prompt, ratio = '1:1') {
  const _ratio = ['1:1', '16:9', '2:3', '3:2', '4:5', '5:4', '9:16', '21:9', '9:21'];

  if (!prompt) throw new Error('Prompt is required');
  if (!_ratio.includes(ratio)) throw new Error(`Available ratios: ${_ratio.join(', ')}`);

  const { data } = await axios.get('https://www.ai4chat.co/api/image/generate', {
    params: { prompt, aspect_ratio: ratio },
    headers: {
      accept: '/',
      'content-type': 'application/json',
      referer: 'https://www.ai4chat.co/image-pages/realistic-ai-image-generator',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  return data;
}

module.exports = { ai4chat };
