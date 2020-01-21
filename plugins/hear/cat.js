const cat = async (context, vk) => {
    await Promise.all([
        context.sendPhoto('https://loremflickr.com/1000/1000/')
    ]);
}

module.exports = [
    {
        hear: '/cat',
        execute: cat
    }
]