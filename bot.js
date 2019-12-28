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

let hearPluginsFolder = fs.readdirSync("./plugins/hear");
let onPluginsFolder = fs.readdirSync("./plugins/on");
let usePluginsFolder = fs.readdirSync("./plugins/on");

let hearFileToExport = [];
let onFileToExport = [];
let useFileToExport = [];

for (let item of hearPluginsFolder) {
    if (item.endsWith(".js")) {
        hearFileToExport.push(`./plugins/hear/${item}`);
        continue;
    }
}

for (let item of onPluginsFolder) {
    if (item.endsWith(".js")) {
        onFileToExport.push(`./plugins/on/${item}`);
        continue;
    }
}

for (let item of usePluginsFolder) {
    if (item.endsWith(".js")) {
        useFileToExport.push(`./plugins/use/${item}`);
        continue;
    }
}

console.log("[] Load plugins...");

hearFileToExport.forEach((pluginPart) => {

    let command = require(pluginPart);

    console.log(`[] Loading '${pluginPart}' plugin with ${command.length} command(s)`)
    
    try {
        helpers.loadCommand(command, (modulePart) => { 
            updates.hear(modulePart.hear, (context) => modulePart.execute(context, vk))
        })

    } catch (e) {
        console.log("Error occurred while loading plugin commands!");
        console.log(pluginPath);
        console.log(e);
    } 
})

onFileToExport.forEach((pluginPart) => {

    let command = require(pluginPart);

    console.log(`[] Loading '${pluginPart}' plugin with ${command.length} command(s)`)
    
    try {
        helpers.loadCommand(command, (modulePart) => { 
            updates.on(modulePart.hear, (context) => modulePart.execute(context, vk))
        })

    } catch (e) {
        console.log("Error occurred while loading plugin commands!");
        console.log(pluginPath);
        console.log(e);
    } 
})

useFileToExport.forEach((pluginPart) => {

    let command = require(pluginPart);

    console.log(`[] Loading '${pluginPart}' plugin with ${command.length} command(s)`)
    
    try {
        helpers.loadCommand(command, (modulePart) => { 
            updates.use(modulePart.hear, (context) => modulePart.execute(context, vk))
        })

    } catch (e) {
        console.log("Error occurred while loading plugin commands!");
        console.log(pluginPath);
        console.log(e);
    } 
})

updates.setHearFallbackHandler(async (context) => {
    if (context.isChat) return;
    await context.send(`Введите /help для получения помощи`);
});


updates.startPolling().then((r)=>{
    console.log("[] Start hearing LongPoll");
}).catch(console.error);