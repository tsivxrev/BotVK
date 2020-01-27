const mInfo = async (context, vk) => {
    context.loadMessagePayload()

    let msgId = context.id;
    let msgInfo = await vk.api.call('messages.getById', {'message_ids': msgId});
	
    await context.reply(JSON.stringify(msgInfo, null, '\t'));
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