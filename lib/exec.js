const execCommand = require('./execCommand/commands.js')

module.exports = function(params) {
    switch(params.deviceType.type) {
        case 'color':
            execCommand.gateway.setColor(params)
        break;
    }
};