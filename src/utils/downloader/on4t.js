const axios = require("axios");
const tough = require("tough-cookie");
const { wrapper } = require("axios-cookiejar-support");

const jar = new tough.CookieJar();
const client = wrapper(axios.create({ jar }));

async function on4t(videoUrl) {
  const BASE_URL = "https://on4t.com";
  const PAGE_URL = `${BASE_URL}/online-video-downloader`;
  const POST_URL = `${BASE_URL}/all-video-download`;

  const pageResp = await client.get(PAGE_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });

  const tokenMatch = pageResp.data.match(/_token: '([^']+)'/);
  if (!tokenMatch) throw new Error("Token tidak ditemukan");
  const token = tokenMatch[1];

  const formData = new URLSearchParams();
  formData.append("_token", token);
  formData.append("link[]", videoUrl);

  const postResp = await client.post(POST_URL, formData.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      "Origin": BASE_URL,
      "Referer": PAGE_URL,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    },
  });

  return postResp.data;
}

module.exports = { on4t };
