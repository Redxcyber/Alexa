module.exports = {
  command: 'promote',
  info: 'Gives admin authority to replied or mentioned user.',
  func: async (sock, msg, text) => {
    if (!text && !msg.replied) return await msg.reply('*Please reply or mention any user!*');
    if (msg.replied) {
      await sock.groupParticipantsUpdate(msg.chat, [msg.replied.sender], 'promote');
      return await msg.reply('*Successfully promoted @' + msg.replied.sender.split('@')[0] + '!*');
    } else if (msg.mentions) {
      msg.mentions.map(async (user) => {
        await sock.groupParticipantsUpdate(msg.chat, [user], 'promote');
      });
      return await msg.reply('*Successfully promoted:*\n@' + msg.mentions.map((user) => user.split('@')[0]).join('\n@'));
    }
  }
};
