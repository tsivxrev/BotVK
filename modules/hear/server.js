const config = require('../../config.json');
const utils = require('../../utils.js');

const server = async(context) => {
    try{
        await context.send(`${utils.toStringJSON(await utils.getDataFromAPI(`http://ipinfo.io/json`))}`)
    } catch (error){
        await Promise.all([
            context.send(String(`${error.name} : ${error.message}`)),
            console.log(error)
        ]);
    }
}

module.exports = [
    {
        hear: { text: '/server', senderId: config.admins},
        execute: server
    }
]