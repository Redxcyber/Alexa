const { parseJson } = require('../helpers/utils');

module.exports = {
  command: 'synonym',
  info: 'Finds synonyms for given term.',
  func: async (sock, msg, text) => {
    if (!text) return await sock.editMessage(msg.key, '*Please enter a term to find synonyms!*');
    let json = await parseJson('https://tuna.thesaurus.com/pageData/' + text);
    let synonyms = json.data.synonyms;
    for (let synonym of synonyms) {
      
    }
  }
};
