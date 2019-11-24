
const shrug = async(context) => {
    await context.send(`¯\\_(ツ)_/¯`)
}

module.exports = [
    {
        hear: /shrug/i,
        execute: shrug
    }
]