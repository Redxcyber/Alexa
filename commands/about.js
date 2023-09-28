module.exports = {
  name: 'about',
  info: 'Gets about of replied user or sets about with provided text.',
  func: async (sock, msg, text) => {
    if (!text && !msg.replied && !msg.mention) return await sock.editMessage(msg.key, '*Please reply or mention any user to get about or enter some text to set about!*');
    if (msg.replied) {
      return await sock.editMessage(
        msg.key,
        await sock.fetchStatus(msg.replied.sender)
         .about
      );
    } else if (msg.mention) {
      msg.mention.map(async (user) => {
        return await sock.editMessage(
          msg.key,
          '*' + await sock.getName(user) + ':* '
          + await sock.fetchStatus(user)
           .about
          );
      });
    } else if (text) {
      await sock.setAbout(msg.me, text).then(async (_) => {
       return await sock.editMessage(msg.key, '*Successfully set about!*');
      }).catch(async (_) => {
       return await sock.editMessage(msg.key, '*Unable to set about!*');
      });
    }
  }
};
