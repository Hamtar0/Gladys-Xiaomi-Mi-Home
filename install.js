const shared = require('./lib/shared.js')
const gatewayXiaomi = require('./lib/device/gateway.js')


module.exports = () => {
    shared.client.on('gateway', (gateway) => {
        console.log('Xiaomi gateway discovered', gateway.sid, gateway.ip);
        gatewayXiaomi(gateway.sid, { color: gateway.color, intensity: gateway.intensity, volume: gateway.volume })
        gladys.param.getValue('XIAOMI_GATEWAY_IDENTIFIER_' + gateway.sid)
            .catch(error => gladys.param.setValue({ name: 'XIAOMI_GATEWAY_IDENTIFIER_' + gateway.sid, value: 'default_value' }))
    })
}