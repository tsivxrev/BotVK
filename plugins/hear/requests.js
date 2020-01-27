let requests = [
    "и сделай 30 приседаний.",
    "и сделай 20 классических отжиманий.",
    "и сделай 20 отжиманий на кулаках.",
    "и сделай 10 подтягиваний.",
    "и сделай разминку шеи.",
    "и сделай разминку рук.",
    "и разминку тела",
    "и сделай упражнения для туловища.",
    "и сделай по 15 выпадов на каждую ногу.",
    "и сделай по 5 наклонов в каждую сторону.",
    "и сделай 20 наклонов вперед.",
    "и сделай чай.",
    "и сделай кофе.",
    "и прочти книгу",
    "и сделай уборку в доме."
]


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


Object.prototype.randElement = function (){
    var rand = Math.floor(Math.random() * this.length);
    
    return this[rand];
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