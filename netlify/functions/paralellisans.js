const axios = require('axios');

const BOT_TOKEN = '8983430355:AAF59gLb7O2x8g_zcNmfTdcuTl3U6k8-sjg';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, body: 'Bot is running...' };
  }

  try {
    const body = JSON.parse(event.body);

    if (body && body.message) {
      const chatId = body.message.chat.id;
      const userText = body.message.text || '';
      const firstName = body.message.from.first_name || 'İstifadəçi';

      let replyText = '';

      if (userText === '/start') {
        replyText = `Salam ${firstName}! 🤖 Botumuz uğurla işləyir. Sizə necə kömək edə bilərəm?`;
      } else {
        replyText = `Siz yazdınız: "${userText}"\n\nBotunuz Netlify üzərindən aktiv şəkildə cavab verir!`;
      }

      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: replyText
      });
    }

    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error('Xəta baş verdi:', error);
    return { statusCode: 500, body: error.toString() };
  }
};
