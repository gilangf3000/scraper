const { downloader } = require("./src");

(async () => {
  try {
    const video = await downloader.on4t("https://vt.tiktok.com/ZSASJjw6Y/");
    console.log(video);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }

})();