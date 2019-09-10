const { VK } = require('vk-io');

const config = require('./config.json');
const utils = require('./modules/utils.js')
const email = require('./modules/email.js')
const info = require('./package.json')

const vk = new VK ({
    token: config.TOKEN
});

const { updates } = vk;


updates.hear(email.EMAIL_ADDRESS_REGEXP, async (context) => {
    try {
        await context.send(`${await email.emailInfoString(await utils.getDataFromAPI(`https://emailrep.io/${context.text}`))}`)
    } catch (error) {
        await context.send(String(`${error.name} : ${error.message}`))
    }
});

updates.hear(email.EMAIL_ADDRESS_REGEXP_RAW, async (context) => {
    try {
        await context.send(`${ await utils.toStringJSON(await utils.getDataFromAPI(`https://emailrep.io/${context.text.replace('/raw', '').replace(' ', '')}`))}`);
    } catch (error) {
        await context.send(String(`${error.name} : ${error.message}`))
    }
});

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

updates.hear(['/time_server', '/date_server'], async (context) => {
    await context.send(String(new Date()));
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