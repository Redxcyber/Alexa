const fs = require('fs');

module.exports = {
  command: 'ytvid',
  info: 'Downloads video from YouTube from its URL.',
  func: async (sock, msg, text) => {
    let video = '';
    let dmsg = await msg.reply('*Downloading video*')
    try {
      video = text.replace(/watch?v=/g, '').split('/')[3];
    } catch {
      return await sock.editMessage(dmsg.key, '*❌ Invalid url, Please enter a valid youtube video url.*');
    }
    await sock.editMessage(dmsg.key, '*Downloading video.*');
    let vid = ytdl(video, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
    await sock.editMessage(dmsg.key, '*Downloading video..*');
    vid.pipe(fs.createWriteStream('../' + video + '.mp4'));
    await sock.editMessage(dmsg.key, '*Downloading video...*');
    vid.on('end', async () => {
     // await sock.
      await sock.sendMessage(msg.chat, { video: fs.readFileSync('../' + video + '.mp4'), mimetype: 'video/mpeg' });
    });
  }
};
