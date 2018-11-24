const playWithClient = require('./lib/playWithClient.js');

module.exports = function(sails) {
  gladys.on('ready', () => {
    playWithClient()
  } )
  return {
    playWithClient: playWithClient,
  }
};