const shared = require('./shared.js')
const gatewayXiaomi = require('./device/gateway.js')
const magnet = require('./device/magnet.js')
const motion = require('./device/motion.js')
const smartWirelessSwitch = require('./device/smartWirelessSwitch.js')
const THPSensor = require('./device/THPSensor.js')
const cube = require('./device/cube.js')

module.exports = () => {
  shared.client.on('gateway', (gateway) => {

    gateway.on('lightState', (state) => {
      console.log('LIGHTSTATE GATEWAY : ', state)
      gatewayXiaomi(gateway.sid, { color: state.color, intensity: state.intensity });
    })

    gateway.on('subdevice', (device) => {
      switch (device.getType()) {
        case 'magnet':
          console.log(`  Magnet (${device.isOpen() ? 'open' : 'close'})`)
          device.on('open', () => {
            magnet(device.getSid(), { status: 0, battery: device.getBatteryPercentage() });
          })
          device.on('close', () => {
            magnet(device.getSid(), { status: 1, battery: device.getBatteryPercentage() });
          })
          device.on('offline', () => {
            console.log(`MAGNET ${device.getSid()} is offline`)
          })
          device.on('online', () => {
            console.log(`MAGNET ${device.getSid()} is online`)
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
        /*         case 'leak':
                   console.log(`  Leak sensor`)
                   device.on('update', () => {
                     console.log(`${device.getSid()}${device.isLeaking() ? '' : ' not'} leaking`)
                   })
                   break */
        case 'cube':
          device.on('update', () => {
            cube(device.getSid(), { status: device.getStatus(), rotation: device.getRotateDegrees(), battery: device.getBatteryPercentage() })
            console.log(`${device.getSid()} ${device.getStatus()}${device.getRotateDegrees() !== null ? ' ' + device.getRotateDegrees() : ''}`)
          })
          break
        /* case 'smoke':
           console.log(`  Smoke`)
           device.on('update', () => {
             console.log(`${device.getSid()} (${device.hasAlarm() ? 'SMOKE DETECTED' : 'no smoke detected'} density: ${device.getDensity()})`)
           })
           break
         /*
                  case 'vibration':
                    console.log(`  Vibration`)
                    device.on('update', () => {
                      console.log(`${device.getSid()} (coordination: ${device.getCoordination()} bed_activity: ${device.getBedActivity()})`)
                    })
                    device.on('vibrate', () => {
                      console.log(`${device.getSid()} has vibration`)
                    })
                    device.on('freeFall', () => {
                      console.log(`${device.getSid()} has freeFall`)
                    })
                    device.on('tilt', () => {
                      console.log(`${device.getSid()} (tilt: ${device.getFinalTiltAngel()}°)`)
                    })
                    break; */
      }
    })
  })
}