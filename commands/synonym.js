const { parseJson } = require('../helpers/utils');

module.exports = {
  command: 'synonym',
  info: 'Searches synonyms for given term.',
  func: async (sock, msg, text) => {
    if (!text) return await msg.reply('*Please enter a term to find synonyms!*');
    let json = await parseJson('https://tuna.thesaurus.com/pageData/' + text);
    let data = json.data.definitionData.definitions[0].synonyms;
    if (data.length < 1) return await msg.reply('*Unable to find synonyms for ' + text + '!*');
    let res = '*Synonyms for:* _' + text + '_\n\n';
    data.forEach((d, i) => {
     if (i <= 10) res += '*' + (i + 1) + '. ' + d.term + '*\n';
    });
    return await msg.reply(res);
  }
};
