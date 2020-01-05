
const shrug = async(context ,vk) => {
    await context.send(`¯\\_(ツ)_/¯`)
}

module.exports = [
    {
        hear: [/(шруг|shrug)/i, '/shrug'],
        execute: shrug
    }
]