const shared = require('./shared.js')
const gatewayXiaomi = require('./device/gateway.js')
const magnet = require('./device/magnet.js')
const motion = require('./device/motion.js')
const smartWirelessSwitch = require('./device/smartWirelessSwitch.js')
const THPSensor = require('./device/THPSensor.js')
const cube = require('./device/cube.js')
const waterLeakSensor = require('./device/waterLeakSensor.js')

module.exports = () => {
  shared.client.on('gateway', (gateway) => {

    gateway.on('lightState', (state) => {
      sails.log.info('LIGHTSTATE GATEWAY : ', state)
      gatewayXiaomi(gateway.sid, { color: state.color, intensity: state.intensity });
    })

    gateway.on('subdevice', (device) => {
      switch (device.getType()) {
        case 'magnet':
          sails.log.info(`  Magnet (${device.isOpen() ? 'open' : 'close'})`)
          device.on('open', () => {
            magnet(device.getSid(), { status: 0, battery: device.getBatteryPercentage() });
          })
          device.on('close', () => {
            magnet(device.getSid(), { status: 1, battery: device.getBatteryPercentage() });
          })
          device.on('offline', () => {
            sails.log.info(`MAGNET ${device.getSid()} is offline`)
          })
          device.on('online', () => {
            sails.log.info(`MAGNET ${device.getSid()} is online`)
          })
          break
        case 'switch':
          device.on('click', () => {
            smartWirelessSwitch(device.getSid(), { status: 1, battery: device.getBatteryPercentage() });
          })
          device.on('doubleClick', () => {
            smartWirelessSwitch(device.getSid(), { status: 2, battery: device.getBatteryPercentage() });
          })
          device.on('longClickPress', () => {
            smartWirelessSwitch(device.getSid(), { status: 3, battery: device.getBatteryPercentage() });
          })
          device.on('longClickRelease', () => {
            smartWirelessSwitch(device.getSid(), { status: 4, battery: device.getBatteryPercentage() });
          })
          break
        case 'motion':
          device.on('motion', () => {
            motion(device.getSid(), { motion: 1, lux: device.getLux(), battery: device.getBatteryPercentage() })
          })
          device.on('noMotion', () => {
            motion(device.getSid(), { motion: 0, lux: device.getLux(), battery: device.getBatteryPercentage(), inactivity: device.getSecondsSinceMotion() })
          })
          break
        case 'sensor':
          device.on('update', () => {
            THPSensor(device.getSid(), { temperature: device.getTemperature(), humidity: device.getHumidity(), pressure: device.getPressure(), battery: device.getBatteryPercentage() })
          })
          break
        case 'leak':
          device.on('update', () => {
            waterLeakSensor(device.getSid(), { status: device.isLeaking(), battery: device.getBatteryPercentage() })
          })
          break
        case 'cube':
          device.on('update', () => {
            cube(device.getSid(), { status: device.getStatus(), rotation: device.getRotateDegrees(), battery: device.getBatteryPercentage() })
          })
          break
        /* case 'smoke':
           sails.log.info(`  Smoke`)
           device.on('update', () => {
             sails.log.info(`${device.getSid()} (${device.hasAlarm() ? 'SMOKE DETECTED' : 'no smoke detected'} density: ${device.getDensity()})`)
           })
           break
         /*
                  case 'vibration':
                    sails.log.info(`  Vibration`)
                    device.on('update', () => {
                      sails.log.info(`${device.getSid()} (coordination: ${device.getCoordination()} bed_activity: ${device.getBedActivity()})`)
                    })
                    device.on('vibrate', () => {
                      sails.log.info(`${device.getSid()} has vibration`)
                    })
                    device.on('freeFall', () => {
                      sails.log.info(`${device.getSid()} has freeFall`)
                    })
                    device.on('tilt', () => {
                      sails.log.info(`${device.getSid()} (tilt: ${device.getFinalTiltAngel()}°)`)
                    })
                    break; */
      }
    })
  })
}
