module.exports = function waterLeakSensor(sid, {status, battery}) {

    console.log('LEAK STATUS : ', status)

    if (status == true) {
        status = 1
    } else {
        status = 0
    }

    var newDevice = {
        device: {
            name: 'Xiaomi Water Leak Sensor',
            identifier: sid,
            protocol: 'zigbee',
            service: 'xiaomi-mi-home'
        },
        types: [
            {
                name: 'Water Leak Sensor',
                identifier: 'binary.' + sid,
                type: 'binary',
                sensor: true,
                min: 0,
                max: 1
            },
            {
                name: 'Battery',
                identifier: 'battery.' + sid,
                type: 'battery',
                sensor: true,
                min: 0,
                max: 100,
                unit: '%',
                category: 'battery-sensor'
            }

        ]
    };

    return gladys.device.create(newDevice)
        .then(async({ types: [_status, _battery] }) => {
                console.log('NEW STATUS VALUE', status)
                await gladys.deviceState.create({devicetype: _status.id, value: status})
                if (battery) await gladys.deviceState.create({devicetype: _battery.id, value: battery})
        })
        .catch(error => console.error('WATER LEAK SENSOR ERROR : ', error));
}