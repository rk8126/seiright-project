const { VALID_URL_REGEX } = require('./const');

exports.isValidUrl = function(url){
  return VALID_URL_REGEX.test(url)
}