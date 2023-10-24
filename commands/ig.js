const { instagram } = require('../helpers/ig');

module.exports = {
  command: 'ig',
  info: 'Downloads instagram post/reels/stories from given url.',
  func: async (sock, msg, text) => {
    if (!text) return await sock.editMessage(msg.key, '*Please enter instagram post, reels or story url!*');
    await instagram(text)
     .then(async (result) => {
      if (!result.status) return await sock.editMessage(msg.key, '*❌ Invalid url, Please enter a valid instagram post/reels/story url!*');
      for (let ig of result.data) {
        if (ig.type == 'image') {
          return await sock.sendMessage(msg.chat, { image: ig.url, mimetype: 'image/png', thumbnail: Buffer.alloc(0) });
        } else {
          return await sock.sendMessage(msg.chat, { video: ig.url, mimetype: 'video/mp4', thumbnail: Buffer.alloc(0) });
        }
      }
    })
  }
};
