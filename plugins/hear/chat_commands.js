const mInfo = async (context) => {
    context.loadMessagePayload()
	await context.reply(JSON.stringify(context, null, '\t'));
}

const shrug = async (context ,vk) => {
    await context.send(`¯\\_(ツ)_/¯`)
}

module.exports = [
    {
        hear: [/(шруг|shrug)/i, '/shrug'],
        execute: shrug
    },
    {
		hear: '/minfo',
		execute: mInfo
	}
]