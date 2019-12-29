const start = async(context, vk) => {
    await context.send(`
        С помощью данного бота можно узнать информацию о электронной почте! Достаточно лишь отправить боту e-mail.
        
        Введите /help для получения помощи.
    `);
}


module.exports = [
	{
		hear: [/^(старт|начать|start)$/i, "/start"],
		execute: start
	}
];
