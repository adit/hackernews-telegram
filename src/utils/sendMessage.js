import axios from 'axios';

export default async function sendMessage({ token, chatId, content }) {
  try {
    console.log('send to telegram');

    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const data = {
      chat_id: chatId,
      text: content,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    };

    await axios.post(apiUrl, data);
  } catch (err) {
    throw new Error(err.response?.data.description) || err;
  }
}
