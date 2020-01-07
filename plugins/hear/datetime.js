const utils = require('../../utils.js');

const dt = async (context, vk) => {
    await context.send(`Текущая дата и время: ${utils.getDateTime(utils.convertDateToUTC())} UTC`);
}

const server_dt = async (context, vk) => {
    await context.send(String(new Date()));
}

module.exports = [
    {
        hear: ['/time', '/date'],
        execute: dt
    },
    {
        hear: ['/time_server', '/date_server'],
        execute: server_dt
    }
]