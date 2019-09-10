const { VK } = require('vk-io');

const config = require('./config.json');
const utils = require('./modules/utils.js')
const email = require('./modules/email.js')
const info = require('./package.json')


const vk = new VK ({
    token: config.TOKEN
});

const { updates } = vk;


updates.hear(
    {
        text : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    async (context) => {
        await context.send(`${email.emailInfoString(await utils.getDataFromAPI(`https://emailrep.io/${context.text}`))}`)
    }
);

updates.hear(
    {
        text : /^\/raw (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    async (context) => {
        await context.send(
            `${utils.toStringJSON(await utils.getDataFromAPI(`https://emailrep.io/${context.text.replace('/raw', '').replace(' ', '')}`))}
        `);
    }
);

updates.hear(['/start', 'Начать'], async (context) => {
    await context.send(`
        С помощью данного бота можно узнать информацию о электронной почте! Достаточно лишь отправить боту e-mail.
        
        Введите /help для получения помощи.
    `);
});

updates.hear('/help', async (context) => {
    await context.send(`
        Для получения информации отправьте e-mail.

        Уровни репутации: low - низкий, medium - средний, hight - высокий
        Значения: true - да , false - нет. 

        Список команд:
        /start - Начать
        /help - Получить список команд
        /time - Текущая дата и время
        /about - Информация о боте
    `);
});

updates.hear(['/time', '/date'], async (context) => {
    await context.send(`Текущая дата и время: ${utils.getDateTime(utils.convertDateToUTC())} UTC`);
});

updates.hear('/about', async (context) => {
    await context.send(`
    ${info.name} - ${info.description}

    Версия: ${info.version}
    Разработчик: @rejson (Иван)
    Платформа: Node JS.
    Используемая библиотека: vk-io 
    `);
});

updates.setHearFallbackHandler(async (context) => {
  await context.send(`${config.is_explicit ? 'Нихуя ты обрыган, подставляй булки.' : 'такой команды нет'}`);
});


updates.startPolling();
updates.start().catch(console.error);