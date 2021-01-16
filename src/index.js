import getTopPosts from './utils/getTopPosts.js';
import sendMessage from './utils/sendMessage.js';

const username = process.argv[2];
const BOT_TOKEN = process.env.BOT_TOKEN;

(async () => {
  try {
    const posts = await getTopPosts(username);
    await sendMessage({
      token: BOT_TOKEN,
      chatId: username,
      content: posts,
    });
    console.log('successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
