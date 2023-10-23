const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
  command: 'video',
  info: 'Downloads video from YouTube from its URL.',
  func: async (sock, msg, text) => {
    if (!text) return await sock.editMessage('*Please enter a YouTube video url!*');
    let video = '';
    try {
      video = text.replace(/watch?v=/g, '').split('/')[3];
    } catch {
      await sock.editMessage(dmsg.key, '*❌ Invalid url, Please enter a valid youtube video url.*');
    }
    await sock.editMessage(msg.key, '*Downloading video...*');
    let file = video + '.mp4';
    let vid = ytdl(video, {
      filter: format => format.container === 'mp4' && ['1080p', '720p', '480p', '360p', '240p', '144p']
        .map(() => true)
    })
    vid.pipe(fs.createWriteStream(file));
    vid.on('end', async () => {
      await sock.sendMessage(msg.chat,
       { delete: msg.key }
      ).then(async () => {
       await sock.sendMessage(msg.chat, { video: fs.readFileSync(file), thumbnail: Buffer.alloc(0), mimetype: 'video/mp4' });
       fs.unlinkSync(file);
      })
    });
  }
};
