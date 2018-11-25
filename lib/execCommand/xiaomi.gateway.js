const shared = require('../shared.js')

module.exports = {
    setColor : setColor,
}

function setColor(params) {

    var RGB = params.rgb !== undefined ? params.rgb : numberToColour(params.state.value);
    var xiomi = shared.client._gateways;
    if(xiomi.has(params.deviceType.identifier)) {
        var gateway = xiomi.get(params.deviceType.identifier)
    }
    gateway.setColor({ r: RGB[0], g: RGB[1], b: RGB[2] })
    //gateway.setIntensity(100)
}


function numberToColour(number) {
    const r = (number & 0xff0000) >> 16;
    const g = (number & 0x00ff00) >> 8;
    const b = (number & 0x0000ff);
    
    return [r, g, b];
}