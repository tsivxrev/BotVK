const utils = require('../utils.js');

const uptime = async(context) => {
    await context.send(`Uptime: ${utils.uptime()}`);
}

module.exports = [
    {
        cmd: ['/uptime', '/stat'],
        execute: uptime
    }
]