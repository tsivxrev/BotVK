
const shrug = async (context ,vk) => {
    await context.send(`¯\\_(ツ)_/¯`)
}

module.exports = [
    {
        hear: /shrug/i,
        execute: shrug
    }
]