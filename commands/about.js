module.exports = {
  name: 'about',
  info: 'Gets about of replied user or sets about with provided text.',
  func: async (sock, msg, text) => {
    if (!text && !msg.replied && !msg.mention) return await sock.editMessage(msg.key, '*Please reply or mention any user to get about or enter some text to set about!*');
    let about;
    if (msg.replied) {
      try {
        about = await sock.fetchStatus(msg.replied.sender).about
      } catch {
        about = '*Unable to fetch about of @' + msg.replied.sender + ' as it is hidden.*'
      }
      return await sock.editMessage(msg.key, about, { mentions: [msg.replied.sender] });
    } else if (msg.mention) {
      msg.mention.map(async (user) => {
        try {
         about = '*' + await sock.getName(user) + ':*\n' + await sock.fetchStatus(user).about
        } catch {
         about = '*Unable to fetch about of @' + user + ' as it is hidden.*'
        }
        return await sock.editMessage(msg.key, about);
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
