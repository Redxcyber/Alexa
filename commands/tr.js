const translate = require('translate-google-api');

module.exports = {
  command: 'tr',
  info: 'Translates replied message from auto-dected language to provided language.',
  func: async (sock, msg, text) => {
    if (!text) return await msg.reply('*Please enter any text!*');
    let lang = text.match('\\{([a-zA-Z]{2})\\}') ? text.match('\\{([a-zA-Z]{2})\\}')[1] : false;
    if (!lang) return msg.reply('*Please enter or reply to any text message along with the language code inside curly brace ( {} )!*\n\n*For example:*\n*- /tr I am Darky {hi}*\n*Above example translates the text \'I am Darky\' to hindi language.*\n\n*- /tr Hello, How are you? {es}*\n*Above example translates the text \'Hello, How are you?\' to spanish language.\n\n*Don\'t know 2-digit language code of your language?*\n*Checkout:* https://en.m.wikipedia.org/wiki/List_of_ISO_639-1_codes');
    let result = await translate(text.replace(/\{([a-zA-Z]{2})\}/g, ''), { tld: 'com', to: lang });
    return await msg.reply(result[0]);
  }
};
