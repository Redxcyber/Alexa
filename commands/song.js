const fs = require('fs');
const yt = require('yt-search');
const ytdl = require('ytdl-core');

module.exports = {
  command: 'song',
  info: 'Downloads song from given lyric.',
  func: async (sock, msg, text) => {
    if (!text) return await msg.reply('*Please enter a song lyric!*');
    text += text.includes('http') ? '' : ' song';
    let mesaj = await msg.reply('*🔍 Searching for song...*');
    let res = '';
    try {
     res = ((await yt(text)).all[0].url).split('/').slice(-1)[0].replace('watch?v=', '');
    } catch {
     return await sock.editMessage(mesaj.key, '*❌ Unable to find any song in this lyric!*');
    }
    let file = './' + res + '.mp3'
    await sock.editMessage(mesaj.key, '*⬇️ Downloading song...*');
    try {
     let audio = ytdl(res, {
      filter: 'audioonly',
      quality: 'highestaudio'
     });
     audio.pipe(fs.createWriteStream(file));
     audio.on('end', async () => {
       await sock.sendMessage(msg.chat,
         { delete: mesaj.key }
       ).then(async () => {
         await sock.sendMessage(msg.chat, { audio: fs.readFileSync(file), mimetype: 'audio/mp4', ptt: false });
       });
     });
   } catch {
     return await msg.reply('*❌ Unable to download the song!*');
   }
  }
};
