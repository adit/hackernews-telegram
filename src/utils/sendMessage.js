import { Telegraf } from 'telegraf';

export default async function sendMessage({ token, chatId, content }) {
  console.log('send to telegram');

  const bot = new Telegraf(token);

  await bot.telegram.sendMessage(chatId, content, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  });
}
