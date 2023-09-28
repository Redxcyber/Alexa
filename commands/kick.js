module.exports = {
  command: 'kick',
  info: 'Removes replied or mentioned user from group.',
  func: async (sock, msg, text) => {
    if (!text && !msg.replied) return await sock.editMessage(msg.key, '*Please reply or mention any user!*');
    if (msg.replied) {
      await sock.groupParticipantsUpdate(msg.chat, [msg.replied.sender], 'remove');
      return await sock.editMessage(msg.key, '*Successfully removed @' + msg.replied.sender.split('@')[0] + '!*');
    } else if (msg.mentions) {
      msg.mentions.map(async (user) => {
        await sock.groupParticipantsUpdate(msg.chat, [user], 'remove');
      });
      return await sock.editMessage(msg.key, '*Successfully removed:*\n@' + msg.mentions.map((user) => user.split('@')[0]).join('\n@'));
    }
  }
};
