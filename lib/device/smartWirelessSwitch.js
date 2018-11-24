module.exports = function smartWirelessSwitch(sid, {status, battery}) {

    var newDevice = {
        device: {
            name: 'Xiaomi Button',
            identifier: sid,
            protocol: 'zigbee',
            service: 'xiaomi-mi-home'
        },
        types: [
            {
                name: 'Smart Wireless Switch',
                identifier: 'binary.' + sid,
                type: 'binary',
                sensor: true,
                min: 1,
                max: 4,
                value: status
            },
            {
                name: 'Battery',
                identifier: 'battery.' + sid,
                type: 'battery',
                sensor: true,
                min: 0,
                max: 100,
                unit: '%',
                category: 'battery-sensor',
                value: battery
            }

        ]
    };

    return gladys.device.create(newDevice)
        .then(async({ types: [_status, _battery] }) => {
                if (status) gladys.deviceState.create({devicetype: _status.id, value: status})
                if (battery) gladys.deviceState.create({devicetype: _battery.id, value: battery})
        })
        .catch(error => console.error('MAGNET ERROR : ', error));
}