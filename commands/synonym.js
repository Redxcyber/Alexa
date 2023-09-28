const { parseJson } = require('../helpers/utils');

module.exports = {
  command: 'synonym',
  info: 'Finds synonyms for given term.',
  func: async (sock, msg, text) => {
    if (!text) return await sock.editMessage(msg.key, '*Please enter a term to find synonyms!*');
    let json = await parseJson('https://tuna.thesaurus.com/pageData/' + text);
    let data = json.data.definitionData.definitions[0].synonyms;
    if (data.length < 1) return await sock.editMessage(msg.key, '*Unable to find synonyms for ' + text + '!*');
    let res = '*Synonyms for:* _' + text + '_\n\n';
    data.forEach(async (data, i) => {
      if (i < 11) res += '*' + i + '. ' + data.term + '*';
    });
    return await sock.editMessage(msg.key, res);
  }
};
