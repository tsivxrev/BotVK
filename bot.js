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


/*let hearList, onList, useList;

if (fs.existsSync("./modules/hear")) hearList = fs.readdirSync("./modules/hear")
if (fs.existsSync("./modules/on")) onList = fs.readdirSync("./modules/on")
if (fs.existsSync("./modules/use")) useList = fs.readdirSync("./modules/use")


let readModule = (fname) => {
    if (!fname.endsWith(".js")) return undefined;
    let ret = require(fname)
    console.log(`[i]\t[+] Loading '${fname.split("/")[3].replace(".js", "")}' module with ${ret.length} handlers`)
    return ret;
}

let parseModule = (list, dir, fun) => {
    if(list != undefined) {
        for(let moduleFile of list) {
            let module = readModule(`./modules/${dir}/${moduleFile}`)
            if(module != undefined) {
                console.log("Module: ", module)
                module.forEach((modulePart) => {
                    console.log("Module part: ", modulePart)
                    fun(modulePart)
                })
            }
        }
    }
}


parseModule(hearList, "hear", (modulePart) => { 
    updates.hear(modulePart.hear, (context) => modulePart.execute(context, vk)) 
})
parseModule(onList, "on", (modulePart) => { 
    updates.on(modulePart.on, (context) => modulePart.execute(context, vk)) 
})
parseModule(useList, "use", (modulePart) => { 
    updates.use(modulePart.use, (context) => modulePart.execute(context, vk)) 
})*/


updates.setHearFallbackHandler(async (context) => {
    if (context.isChat) return;
    await context.send(`Введите /help для получения помощи`);
});


updates.startPolling().then((r)=>{
    console.log("[] Start hearing LongPoll");
}).catch(console.error);

