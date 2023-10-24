const axios = require('axios');

async function parseJson(url) {
  try {
   let { data } = await axios.get(url);
   return data;
  } catch (e) {
   console.log('An error occurred while fetching JSON:\n\n' + e.stack);
   return false;
  }
}

function isUrl(url) {
  return url.match(
    /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  );
}

function numericalToString(number) {
  if (isNaN(number)) return false;
  if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
  else if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
  else return number.toString();
}


module.exports = { parseJson, isURL, numericalToString };
