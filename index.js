const playWithClient = require('./lib/playWithClient.js');
const install = require('./install.js');

module.exports = function(sails) {
  gladys.on('ready', () => {
    playWithClient(),
    install()
  } )
  return {
    playWithClient: playWithClient,
    install: install
  }
};