const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
  command: 'video',
  info: 'Downloads video from YouTube from its URL.',
  func: async (sock, msg, text) => {
    if (!text) return await msg.reply('*Please enter a YouTube video url!*');
    let ytregex = /https:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+|https:\/\/youtu\.be\/[\w-]+|https:\/\/(?:www\.)?youtube\.com\/shorts\/[\w-]+/i;
    let video = '';
    try {
      text = text.match(ytregex)[0] !== undefined ? text.match(ytregex)[0] : (() => { throw false; })()
      video = (text.split('/').slice(-1)[0]).includes('?') ? text.split('/').slice(-1)[0].split('?')[0] : text.split('/').slice(-1)[0];
    } catch {
      await msg.reply('*❌ Invalid url, Please enter a valid youtube video url.*');
    }
    let vim = await msg.reply('*⬇️ Downloading video...*');
    let file = video + '.mp4';
    let vid = ytdl(video, {
      filter: format => format.container === 'mp4' && ['1080p', '720p', '480p', '360p', '240p', '144p']
        .map(() => true)
    })
    vid.pipe(fs.createWriteStream(file));
    vid.on('end', async () => {
      await sock.sendMessage(msg.chat,
       { delete: vim.key }
      ).then(async () => {
       await sock.sendMessage(msg.chat, { video: fs.readFileSync(file), thumbnail: Buffer.alloc(0), mimetype: 'video/mp4' });
       fs.unlinkSync(file);
      })
    });
  }
};
