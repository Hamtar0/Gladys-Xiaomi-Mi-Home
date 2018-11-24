const Aqara = require('lumi-aqara');

module.exports = {
    _client : null,
    get client() {
    if(!this._client) return this.init()
         return this._client
    },
    init() {
    return this._client = new Aqara()
    },
    reset() {
    return this._client = null
    }
}