const start = async(context) => {
    await context.send(`
        С помощью данного бота можно узнать информацию о электронной почте! Достаточно лишь отправить боту e-mail.
        
        Введите /help для получения помощи.
    `);
}


module.exports = [
	{
		hear: ['/start', /start/i, /начать/i],
		execute: start
	}
];