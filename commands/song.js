const yt = require('yt-search');
const ytdl = require('ytdl-core');

module.exports = {
  command: 'song',
  info: 'Downloads song from given lyric.',
  func: async (sock, msg, text) => {
    if (!text) return await sock.editMessage(msg.key, '*Please enter a song lyric!*');
    text += text.includes('http') ? '' : ' song';
    let res = '';
    try {
     res = (await yt(text).all[0].url).split('/').slice(-1)[0];
    } catch {
     return await sock.editMessage(msg.key, '*❌ Unable to find any song in this lyric!*');
    }
    let file = './' + res + '.mp3'
    try {
     let audio = ytdl(res, {
      filter: format => format.container === 'mp3' && []
        .map(() => true)
     })
     audio.pipe(fs.createWriteStream(file));
     audio.on('end', async () => {
       return await sock.sendMessage(msg.chat, { audio: fs.readFileSync(file), mimetype: 'audio/mp3', ptt: false });
     });
   } catch (e) {
     await msg.reply(String(e));
   }
  }
};
