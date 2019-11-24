const utils = require('../../utils.js');

const uptime = async(context) => {
    await context.send(`Uptime: ${utils.uptime()}`);
}

module.exports = [
    {
        hear: ['/uptime', '/stat'],
        execute: uptime
    }
]