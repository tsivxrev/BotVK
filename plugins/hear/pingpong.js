const pingPong = async (context, next) => {
	await context.send(`pong`);
}


module.exports = [
	{
		hear: [/^(пинг|ping)$/i, "/ping"],
		execute: pingPong
	}
];