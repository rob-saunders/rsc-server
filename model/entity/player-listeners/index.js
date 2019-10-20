const plugin = require('../../../operations/plugin')

// eslint-disable-next-line no-undef
const listeners = plugin.loadSet(__dirname)

module.exports = player => {
    for (const listener of listeners) {
        listener(player)
    }
}