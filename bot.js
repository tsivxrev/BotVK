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

let files = fs.readdirSync("./modules")
for (let file of files) {
    if (file.endsWith(".js")) {
        let module = require(`./modules/${file}`)
        console.log(`[i]\t[+] Loading ${file.replace(".js", "")} module`)
        module.forEach((modulePart) => {
            if(modulePart.senderId != undefined) {
                updates.hear({
                    text: modulePart.cmd,
                    senderId : modulePart.senderId
                }, modulePart.execute)
            }
            else if(modulePart.on != undefined) {
                updates.on(modulePart.on, modulePart.execute)
            }
            else {
                updates.hear(modulePart.cmd, modulePart.execute)
            }
        })
    }
}

updates.setHearFallbackHandler(async (context) => {
    if (context.isChat) return;
    await context.send(`${config.is_explicit ? 'Введите /help для получения помощи' : 'Такой команды нет. Введите /help для получения помощи'}`);
});

console.log("[i] All modules successfully loaded. Starting bot...")
updates.startPolling().catch(console.error);
