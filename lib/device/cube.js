const CUBE_TYPE_MAPPING = {
    flip90: 1,
    flip180: 2,
    move: 3,
    tap_twice: 4,
    shake_air: 5,
    swing: 6,
    alert: 7,
    free_fall: 8,
    rotate: 9
};

module.exports = function cube(sid, { status, rotation, battery }) {

    /* Values possibilities for Cube
        1 : flip 90°
        2 : flip 180°
        3 : move (on a plane surface)
        4 : tap twice (with the cube on a surface)
        5 : shake air
        6 : swing (?)
        7 : alert : motion detected after a minute
        8 : free fall
        9 : rotate
    */

    var newDevice = {
        device: {
            name: 'Xiaomi Cube',
            identifier: sid,
            protocol: 'zigbee',
            service: 'xiaomi-mi-home'
        },
        types: [
            {
                name: 'Cube',
                identifier: 'binary.' + sid,
                type: 'cube',
                sensor: true,
                min: 1,
                max: 9
            },
            {
                name: 'Rotation',
                identifier: 'rotation.' + sid,
                type: 'rotation',
                sensor: true,
                min: -360,
                max: 360,
                unit: '°'
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
        .then(async ({ types: [_status, _rotation, _battery] }) => {
            if (status) await gladys.deviceState.create({ devicetype: _status.id, value: CUBE_TYPE_MAPPING[status] })
            if (rotation) await gladys.deviceState.create({ devicetype: _rotation.id, value: rotation })
            if (battery) await gladys.deviceState.create({ devicetype: _battery.id, value: battery })
        })
        .catch(error => console.error('CUBE ERROR : ', error));
}