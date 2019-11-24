
const shrug = async(context) => {
    await context.send(`¯\\_(ツ)_/¯`)
}

module.exports = [
    {
        cmd: /shrug/i,
        execute: shrug
    }
]