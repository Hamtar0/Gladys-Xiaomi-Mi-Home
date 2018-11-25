const playWithClient = require('./lib/playWithClient.js');
const install = require('./install.js');
const exec = require('./lib/exec.js');
const command = require('./lib/execCommand/commands.js')

module.exports = function(sails) {
  gladys.on('ready', () => {
    playWithClient(),
    install()
  } )
  return {
    playWithClient: playWithClient,
    install: install,
    exec:exec,
    command:command
  }
};