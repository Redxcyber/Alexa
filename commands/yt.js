const yt = require('yt-search');

module.exports = {
  command: 'yts',
  info: 'Searches video in YouTube for give query.',
  func: async (sock, msg, text) => {
   if (!text) return await msg.reply('*Please enter your query to search in YouTube!*');
   let mesaj = await msg.reply('*🔍 Searching...*');
   try {
    let results = await yt(text);
    await sock.sendMessage(msg.chat, { delete: mesaj.key });
    await msg.reply(results.all.map((v) => '_Title_ : *' + v.title + '*\n_URL_ : ' + (v.url.replace('watch?v=', '').replace('youtube.com', 'youtu.be')) + '\n_Duration_ : *' + v.timestamp + '*\n_Views_ : *' + v.views + '*\n_Uploaded_ : *' + v.ago + '*\n_Uploaded by_ : *' + v.author.name + '*\n_Channel_ : ' + v.author.url).join('\n\n'));
   } catch {
    return await msg.reply('*❌ Unable to find results for your query!*');
   }
  }
};
