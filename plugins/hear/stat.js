const utils = require('../../utils.js');


const uptime = async (context, vk) => {
    await context.send(`Uptime: ${utils.uptime()}`);
}


module.exports = [
    {
        hear: ['/uptime'],
        execute: uptime
    }
]