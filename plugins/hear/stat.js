const fs = require('fs');
const utils = require('../../utils.js');
const config = require('../../config.json');

const uptime = async(context, vk) => {
    await context.send(`Uptime: ${utils.uptime()}`);
}

module.exports = [
    {
        hear: ['/uptime'],
        execute: uptime
    }
]