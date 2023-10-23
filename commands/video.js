const fs = require('fs');
const ytdl = require('ytdl-core');
module.exports = {
  command: 'ytvid',
  info: 'Downloads video from YouTube from its URL.',
  func: async (sock, msg, text) => {
    let video = '';
    try {
      video = text.replace(/watch?v=/g, '').split('/')[3];
    } catch {
      return await sock.editMessage(dmsg.key, '*❌ Invalid url, Please enter a valid youtube video url.*');
    }
    await sock.editMessage(msg.key, '*Downloading video...*');
    let file = __dirname + '/src/' + video + '.mp4';
    let vid = ytdl(video, {
      filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p']
        .map(() => true)
    });
    vid.pipe(fs.createWriteStream(file));
    vid.on('end', async () => {
      await sock.sendMessage(msg.chat, { delete: msg.key })
      await sock.sendMessage(msg.chat, { video: fs.readFileSync(file), mimetype: 'video/mpeg' });
    });
  }
};
