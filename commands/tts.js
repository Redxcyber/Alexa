const gtts = require('google-tts-api');

module.exports = {
  command: 'tts',
  info: 'Converts text to speech using Google Text-To-Speech.',
  func: async (sock, msg, text) => {
    let ttsText = text !== '' ? text : msg.replied && msg.replied.text ? msg.replied.text : false
    if (!ttsText) return await sock.editMessage(msg.key, '*Please enter or reply to any text to speak!*');
    let lang = 'en', ttsMessage = ttsText, isSlow = false
    if (langMatch = ttsMessage.match('\\{([a-zA-Z]{2})\\}')) lang = langMatch[1], ttsMessage = ttsMessage.replace(langMatch[0], '')
    if (ttsMessage.includes('{slow}')) ttsMessage = ttsMessage.replace(/{slow}/g, ''), isSlow = true
    if (ttsMessage.length > 200) return await sock.editMessage(msg.key, '*❌ Lengthy text, The text you entered is so lengthy to speak, maximum 200 characters only!*');
    let audio = false;
    try {
     audio = await gtts.getAudioUrl(ttsMessage, { lang: lang, slow: isSlow, host: 'https://translate.google.com' });
    } catch {
     return await sock.editMessage(msg.key, '*❌ Invalid Language, Please enter a valid language code!*');
    }
    return await sock.sendMessage(msg.chat, { audio: { url: audio }, ptt: true, mimetype: 'audio/mpeg', waveform: Array(40).fill().map(() => Math.floor(Math.random() * 99)) });
   }
  };
