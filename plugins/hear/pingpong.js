const pingPong = async (context, next) => {
	await context.send(`pong`);
}

const mInfo = async (context) => {
	await context.reply(JSON.stringify(context, null, '\t'));
}


module.exports = [
	{
		hear: [/^(пинг|ping)$/i, "/ping"],
		execute: pingPong
	}, 
	{
		hear: '/minfo',
		execute: mInfo
	}
];