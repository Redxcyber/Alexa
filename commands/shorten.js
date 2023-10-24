const { isURL } = require('../helpers/utils');
const { shorten } = require('../helpers/shorten');

module.exports = {
  command: 'shorten',
  info: 'Shortens given long url using.',
  func: async (sock, msg, text) => {
    let Text = text !== '' ? text : msg.replied.text ? msg.replied.text : false;
    if (!Text) return await msg.reply('*Please enter or reply to any url to shorten!*');
    if (!isURL(Text)) return await msg.reply('*❌ Invalid url, Please enter or reply to any valid url only!*');
    let result = await shorten(Text);
    return await msg.reply(result);
  }
};
