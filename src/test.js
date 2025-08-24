const { deepseek } = require('./utils/ai/deepseek');

(async () => {
  try {
    const reply = await deepseek("Apa itu JavaScript?");
    console.log(await reply.choices);
  } catch (err) {
    console.error(err.message);
  }
})();
