const { parseJson } = require('../helpers/utils');

module.exports = {
  command: 'antonym',
  info: 'Searches antonyms for given term.',
  func: async (sock, msg, text) => {
    if (!text) return await msg.reply('*Please enter a term to find antonyms!*');
    let json = await parseJson('https://tuna.thesaurus.com/pageData/' + text);
    let data = json.data.definitionData.definitions[0].antonyms;
    if (data.length < 1) return await msg.reply('*Unable to find antonyms for ' + text + '!*');
    let res = '*Antonyms for:* _' + text + '_\n\n';
    data.forEach((d, i) => {
     if (i <= 10) res += '*' + (i + 1) + '. ' + d.term + '*\n';
    });
    return await msg.reply(res);
  }
};
