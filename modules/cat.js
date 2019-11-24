
const cat = async(context) => {
    await Promise.all([
        context.sendPhoto('https://loremflickr.com/1000/1000/')
    ]);
}

module.exports = [
    {
        cmd: '/cat',
        execute: cat
    }
]