const { instagram } = require('../helpers/ig');

module.exports = {
  command: 'ig',
  info: 'Downloads instagram post/reels/stories from given url.',
  func: async (sock, msg, text) => {
    if (!text) return await sock.editMessage(msg.key, '*Please enter instagram post, reels or story url!*');
    await instagram(text).then(async (result) => {
      if (!result.status) return await sock.editMessage(msg.key, '*❌ Invalid url, Please enter a valid instagram post/reels/story url!*');
    });
  }
};
