const { allCommands } = require('../index');
const config = require('../config');

module.exports = {
  command: 'menu',
  info: '',
  func: async (sock, msg, text) => {
    let cmd = '';
    allCommands().forEach(async (cm) => {
       if (cm.command !== 'menu') cmd += '*' + config.PREFIX + cm.command + '*\n```' + cm.info + '```\n\n';
    });
    return await msg.reply(cmd);
  }
}
