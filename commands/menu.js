const { allCommands } = require('../index');

module.exports = {
  command: 'menu',
  info: '',
  func: async (sock, msg, text) => {
    let cmd = '';
    allCommands().forEach(async (cm) => {
       if (cm.command !== 'menu') cmd += '*/' + cm.command + '*\n```' + cm.info + '```\n\n';
    });
    return await msg.editMessage(msg.key, cmd);
  }
}
