const { allCommands } = require('../index');

module.exports = {
  command: 'menu',
  info: '',
  func: async (sock, msg, text) => {
    let cmd = '';
    allCommands().forEach(async (cm) => {
       if (cm.command !== 'menu') cmd += '*/' + cm.command + '*\n_' + cm.info + '_\n\n';
    });
    return await msg.reply(cmd);
  }
}
