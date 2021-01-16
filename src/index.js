import getTopPosts from './utils/getTopPosts.js';
import sendMessage from './utils/sendMessage.js';

const username = process.argv[2];
const BOT_TOKEN = process.env.BOT_TOKEN;

(async () => {
  const posts = await getTopPosts(username);
  await sendMessage({
    token: BOT_TOKEN,
    chatId: username,
    content: posts,
  });
  console.log('successfully');
})();
