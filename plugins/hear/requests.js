Object.defineProperty(
    Object.prototype,
    'randElement',
    {
        value: function() {
            var rand = Math.floor(Math.random() * this.length);
            return this[rand];
        }
    }
);

let requestPlease = async (context, vk) => {

    await context.send({
        attachment: 'photo502046138_457250333_7126224d0353b509d2',
        message: `Оторвись от компа ${requests.randElement()}`
    });
}

let requestPleaseCustom = async (context, vk) => {

    await context.send({
        attachment: 'photo502046138_457250333_7126224d0353b509d2',
        message: `Оторвись от компа ${context.$match[1].split('').join('')}`
    });
}


module.exports = [
    {
        hear: ['/please', /^просьба/],
        execute: requestPlease
    },
    {
        hear: /\/плиз (.+)/,
        execute: requestPleaseCustom
    }
]