const execCommand = require('./execCommand/commands.js')

module.exports = function(params) {
    switch(params.deviceType.type) {
        case 'color':
            execCommand.gateway.setColor(params);
        break;

        case 'light':
            execCommand.gateway.setIntensity(params);
        break;

        case 'binary':
            params.intensity = params.state.value === 1 ? 100 : 0;
            execCommand.gateway.setIntensity(params);
        break;
    }
};
