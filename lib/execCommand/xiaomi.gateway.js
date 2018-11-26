const shared = require('../shared.js');
const command = ['setColor','setIntensity'];

module.exports = {
    setColor : setColor,
    setIntensity: setIntensity,
}

function setIntensity(params) {
    var intensity = params.intensity !== undefined ? params.intensity : params.state.value;
    var commandParams = {
        value: intensity,
        command: 'setIntensity',
        sid: params.deviceType.identifier
    }
    return sendCommand(commandParams)
}

function setColor(params) {

    var RGB = params.rgb !== undefined ? params.rgb : numberToColour(params.state.value);
    var commandParams = {
        value: { r: RGB[0], g: RGB[1], b: RGB[2] },
        command: 'setColor',
        sid: params.deviceType.identifier
    }
    return sendCommand(commandParams)
    
}

function sendCommand(params) {
    var sid = params.sid;
    var xiomi = shared.client._gateways;
    if(xiomi.has(sid)) {
        var gateway = xiomi.get(sid);

        return getPassword(sid)
        .then((password) => {
            gateway.setPassword(password);
            gateway[params.command](params.value);
        })
        .catch((err)=>{
            sails.log.error(err);
        })
        
    }
}

function getPassword(sid) {
    return gladys.param.getValue('XIAOMI_GATEWAY_IDENTIFIER_'+sid);
}

function numberToColour(number) {
    const r = (number & 0xff0000) >> 16;
    const g = (number & 0x00ff00) >> 8;
    const b = (number & 0x0000ff);
    
    return [r, g, b];
}
