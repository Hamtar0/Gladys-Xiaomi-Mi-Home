module.exports = function THPSensor(sid, { temperature, humidity, pressure, battery }) {

    var newDevice = {
        device: {
            name: 'Xiaomi Temperature and Humidity',
            identifier: sid,
            protocol: 'zigbee',
            service: 'xiaomi-mi-home'
        },
        types: [
            {
                name: 'Temperature',
                identifier: 'motion.' + sid,
                type: 'temperature',
                tag: 'temperature',
                category: 'temperature-sensor',
                unit: '°C',
                sensor: true,
                min: -20,
                max: 50
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
                name: 'Humidity',
                type: 'humidity',
                identifier: 'humidity.' + sid,
                tag: 'humidity',
                category: 'humidity-sensor',
                unit: '%',
                sensor: true,
                min: 0,
                max: 100
            }

        ]
    };

    if (pressure) {
        newDevice.types.push({
            name: 'Pressure',
            type: 'pressure',
            identifier: 'pressure.' + sid,
            tag: 'pressure',
            unit: 'kPa',
            sensor: true,
            min: 30,
            max: 110
        })
    };

    return gladys.device.create(newDevice)
        .then(async ({ types: [_temperature, _battery, _humidity, _pressure] }) => {
            if (temperature) await gladys.deviceState.create({ devicetype: _temperature.id, value: temperature })
            if (battery) await gladys.deviceState.create({ devicetype: _battery.id, value: battery })
            if (humidity) await gladys.deviceState.create({ devicetype: _humidity.id, value: humidity })
            if (pressure) await gladys.deviceState.create({ devicetype: _pressure.id, value: pressure })
        })
        .catch(error => console.error('THP SENSOR ERROR : ', error));
}