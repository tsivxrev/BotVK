const { VK } = require('vk-io');

const fs = require('fs');
const config = require('./config.json');
const helpers = require('./helpers/loader.js')


const vk = new VK ({
    token: process.env.TOKEN || config.TOKEN,
    pollingGroupId: config.group_id
});

const { updates } = vk;


console.log("[] Initing plugins...");

let pluginsHearFolder = fs.readdirSync("./plugins/hear");
let pluginsOnFolder = fs.readdirSync("./plugins/on");
let fileToExportHear = [];
let fileToExportOn = [];

for (let item of pluginsHearFolder) {
    if (item.endsWith(".js")) {
        fileToExportHear.push(`./plugins/hear/${item}`);
        continue;
    }
}

for (let item of pluginsOnFolder) {
    if (item.endsWith(".js")) {
        fileToExportOn.push(`./plugins/on/${item}`);
        continue;
    }
}

console.log("[] Load plugins...");

helpers.commandOnReceived(fileToExportOn, (modulePart) => { 
    updates.on(modulePart.type, (context) => modulePart.execute(context, vk))
})

helpers.commandOnReceived(fileToExportHear, (modulePart) => { 
    updates.hear(modulePart.hear, (context) => modulePart.execute(context, vk))
})

updates.setHearFallbackHandler(async (context) => {
    if (context.isChat) return;
    await context.send(`Введите /help для получения помощи`);
});


updates.startPolling().then((r)=>{
    console.log("[] Start hearing LongPoll");
}).catch(console.error);
