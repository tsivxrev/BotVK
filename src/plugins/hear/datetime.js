const utils = require('../../utils.js');

const dt = async (context, vk) => {
    await context.send(`Текущая дата и время: ${utils.getDateTimes()}`);
}

const server_dt = async (context, vk) => {
    await context.send(utils.getDateTimes("Europe/Moscow"));
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