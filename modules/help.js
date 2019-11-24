
const help = async(context) => {
    await context.send(`
        Для получения информации отправьте e-mail.

        Список команд:
        /start - Нaчать
        /help - Получить список команд
        /time - Текущая дата и время
        /about - Информация о боте

        Подробнее https://vk.com/@emailsbot-start
    `);
}


module.exports = [
    {
        cmd: ['/help', /помощь/i],
        execute: help
    }
]