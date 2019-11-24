const utils = require('../utils.js');

const dt = async(context) => {
    await context.send(`Текущая дата и время: ${utils.getDateTime(utils.convertDateToUTC())} UTC`);
}

const server_dt = async(context) => {
    await context.send(String(new Date()));
}

module.exports = [
    {
        cmd: ['/time', '/date'],
        execute: dt
    },
    {
        cmd: ['/time_server', '/date_server'],
        execute: server_dt
    }
]