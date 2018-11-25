module.exports = function motionSensor(sid, { motion, lux, battery, inactivity }) {

    var newDevice = {
        device: {
            name: 'Xiaomi Human Motion Sensor',
            identifier: sid,
            protocol: 'zigbee',
            service: 'xiaomi-mi-home'
        },
        types: [
            {
                name: 'Human Motion Sensor',
                identifier: 'motion.' + sid,
                type: 'binary',
                tag: 'motion',
                sensor: true,
                min: 0,
                max: 1
            },
            {
                name: 'Battery',
                type: 'battery',
                identifier: 'battery.' + sid,
                tag: 'battery',
                category: 'battery-sensor',
                unit: '%',
                sensor: true,
                min: 0,
                max: 100
            },
            {
                name: 'Seconds inactivity',
                type: 'seconds',
                identifier: 'inactivity.' + sid,
                tag: 'seconds',
                unit: 'sec',
                sensor: true,
                min: 0,
                max: 1800
            }

        ]
    };

    if (lux) {
        newDevice.types.push({
            name: 'Light',
            type: 'light',
            identifier: 'light.' + sid,
            tag: 'light',
            category: 'light-sensor',
            unit: 'lux',
            sensor: true,
            min: 0,
            max: 800
        })
    };

    return gladys.device.create(newDevice)
        .then(async ({ types: [_motion, _battery, _inactivity, _lux] }) => {
            if (motion) await gladys.deviceState.create({ devicetype: _motion.id, value: motion })
            if (battery) await gladys.deviceState.create({ devicetype: _battery.id, value: battery })
            if (inactivity) await gladys.deviceState.create({ devicetype: _inactivity.id, value: inactivity })
            if (lux) await gladys.deviceState.create({ devicetype: _lux.id, value: lux })
        })
        .catch(error => console.error('MOTION ERROR : ', error));
}