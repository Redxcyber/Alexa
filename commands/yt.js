const yt = require('yt-search');

module.exports = {
  command: 'yts',
  info: 'Searches video in YouTube for give query.',
  func: async (sock, msg, text) => {
   if (!text) return await sock.editMessage(msg.key, '*Please enter your query to search in YouTube!*');
   await sock.editMessage(msg.key, '*🔍 Searching...*');
   try {
    let results = await yt(text);
    await msg.reply(JSON.stringify(results));
   } catch {
    return await sock.editMessage(msg.key, '*❌ Unable to find results for your query!*');
   }
   await sock.editMessage(msg.key, results.all.map((v) => '*' + v.title + '*\n' + v.url).join('\n\n'));
  }
};
