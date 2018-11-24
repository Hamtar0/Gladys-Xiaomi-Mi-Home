function colorToNumber(r, g, b) {
    return (r << 16) + (g << 8) + (b);
}

module.exports = function gatewayXiaomi(sid, { color, intensity, volume }) {

    color = colorToNumber(color.r, color.g, color.b);

    var newDevice = {
        device: {
            name: 'Xiaomi Gateway',
            protocol: 'zigbee',
            service: 'xiaomi-mi-home',
            identifier: sid
        },
        types: [
            {
                name: 'Color',
                type: 'color',
                identifier: 'color.' + sid,
                tag: 'color',
                unit: 'decimal',
                sensor: false,
                min: 0,
                max: 255,
                value: color,
                category: 'light'
            },
            {
                name: 'Intensity',
                type: 'light',
                identifier: 'intensity.' + sid,
                tag: 'intensity',
                unit: '%',
                sensor: true,
                min: 0,
                max: 100,
                value: intensity,
                category: 'light'
            }]
    };

    if (volume) {
        newDevice.types.push({
            name: 'Volume',
            type: 'music',
            identifier: 'volume.' + sid,
            tag: 'volume',
            unit: '%',
            sensor: true,
            min: 0,
            max: 100,
            value: volume,
            category: 'music'
        })
    };

    return gladys.device.create(newDevice)
        .then(async ({ types: [_color, _intensity, _volume] }) => {
            if (color) gladys.deviceState.create({ devicetype: _color.id, value: color })
            if (intensity) gladys.deviceState.create({ devicetype: _intensity.id, value: intensity })
            if (volume) gladys.deviceState.create({ devicetype: _volume.id, value: volume })
        })
        .catch(error => console.error('GATEWAY ERROR : ', error));
}