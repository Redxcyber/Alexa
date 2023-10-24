const g_i_s = require('g-i-s');

module.exports = {
  command: 'image',
  info: 'Searches image in google for given query.',
  func: async (sock, msg, text) => {
    if (!text) return await msg.reply('*Please enter your query to search for image in google!*');
    if (/(porn|xxx|x-rated|adult|sex|nude|erotic|playboy|penthouse|strip|pornographic|liplock|🍑|🍌|🍆|buttock|vagina|dick|penis|pussy)/.test(text)) return await msg.reply('*⚠️ This query is banned!*');
    let cl;
    if (cl = text.match('\\{([0-9]{1})\\}')) {
     cl = cl[1]
    } else {
     cl = 5
    }
    await msg.reply('*⬇️ Downloading {} images...*'.replace('{}', cl));
    await g_i_s(text, async (error, result) => {
     let count = []
     count.length = cl
     for (let c of count) {
      let url = result[Math.floor(Math.random() * result.length)].url
      await sock.sendMessage(msg.chat, { image: { url: url }, thumbnail: Buffer.alloc(0), mimetype: 'image/png' });
     }
    });
   }
};
