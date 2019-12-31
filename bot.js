const { VK } = require('vk-io');

const fs = require('fs');
const config = require('./config.json');
const utils = require('./utils.js');
const helpers = require('./helpers/loader.js')


const vk = new VK ({
    token: utils.isEmptyString(process.env.TOKEN) ? config.TOKEN : process.env.TOKEN,
    pollingGroupId: config.group_id
});

const { updates } = vk;


console.log("[] Initing plugins...");

let pluginsFolder = fs.readdirSync("./plugins/hear");
let fileToExport = [];

for (let item of pluginsFolder) {
    if (item.endsWith(".js")) {
        fileToExport.push(`./plugins/hear/${item}`);
        continue;
    }
}

console.log("[] Load plugins...");

fileToExport.forEach((pluginPart) => {

    try {
        let command = require(pluginPart);

        console.log(`[] Loading '${pluginPart}' plugin with ${command.length} command(s)`)
        
        helpers.loadCommand(command, (modulePart) => { 
            updates.hear(modulePart.hear, (context) => modulePart.execute(context, vk))
        })

    } catch (e) {
        console.log("Error occurred while loading plugin commands!");
        console.log(pluginPart);
    } 
})

updates.setHearFallbackHandler(async (context) => {
    if (context.isChat) return;
    await context.send(`Введите /help для получения помощи`);
});


updates.startPolling().then((r)=>{
    console.log("[] Start hearing LongPoll");
}).catch(console.error);
