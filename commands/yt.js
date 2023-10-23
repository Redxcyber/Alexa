const yt = require('yt-search');

module.exports = {
  command: 'yts',
  info: 'Searches video in YouTube for give query.',
  func: async (sock, msg, text) => {
   if (!text) return await sock.editMessage(msg.key, '*Please enter your query to search in YouTube!*');
   await sock.editMessage(msg.key, '*🔍 Searching...*');
   try {
    let results = await yt(text);
    await sock.editMessage(msg.key, results.all.map((v) => '_Title_ : *' + v.title + '*\n_URL_ : ' + v.url + '\n_Duration_ : *' + v.timestamp + '*\n_Viewd_ : *' + v.views + '*\n_Uploaded_ : *' + v.ago + '*\n_Uploaded by_ : *' + v.author.name + '*\n_Channel_ : ' + v.author.url).join('\n\n'));
   } catch {
    return await sock.editMessage(msg.key, '*❌ Unable to find results for your query!*');
   }
  }
};
