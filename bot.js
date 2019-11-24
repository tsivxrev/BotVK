const { VK } = require('vk-io');
const fs = require('fs');

const config = require('./config.json');

let vk = null

if(config.TOKEN == "") {
    vk = new VK ({
        token: process.env.TOKEN,
        pollingGroupId: config.group_id
    });
}
else {
    vk = new VK ({
        token: config.TOKEN,
        pollingGroupId: config.group_id
    });
}

const { updates } = vk;

console.log("[i] Modules initialization...")

let hearList = fs.readdirSync("./modules/hear")
let onList = fs.readdirSync("./modules/on")
let useList = fs.readdirSync("./modules/use")

let readModule = (fname) => {
    if (!fname.endsWith(".js")) return undefined;
    let ret = require(fname)
    console.log(`[i]\t[+] Loading ${fname.split("/")[3].replace(".js", "")} module with ${ret.length} handlers`)
    return ret;
}

let parseModule = (list, dir, fun) => {
    for(let moduleFile of list) {
        let module = readModule(`./modules/${dir}/${moduleFile}`)
        if(module != undefined) {
            module.forEach((modulePart) => {
                fun(modulePart)
            })
        }
    }
}

parseModule(hearList, "hear", (modulePart) => { updates.hear({ text: modulePart.hear, senderId: modulePart.senderId}, modulePart.execute) })
parseModule(onList, "on", (modulePart) => { updates.on(modulePart.on, modulePart.execute) })
parseModule(useList, "use", (modulePart) => { updates.use(modulePart.use, modulePart.execute) })


updates.setHearFallbackHandler(async (context) => {
    if (context.isChat) return;
    await context.send(`${config.is_explicit ? 'Введите /help для получения помощи' : 'Такой команды нет. Введите /help для получения помощи'}`);
});

console.log("[i] All modules successfully loaded. Starting bot...")
updates.startPolling().catch(console.error);
