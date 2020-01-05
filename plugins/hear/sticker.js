let parsedData = (data) => {
    let parsed = [];

    data.forEach((r) => {
        parsed.push(`ID стикера: ${r['id']}`)
        parsed.push(`ID продукта: ${r['productId']}`)
        parsed.push(``)
        parsed.push(`Ссылки на изображения стикера в разных размерах:`)
        r['images'].forEach((size) => {
            parsed.push(`${size.width}x${size.height} : ${size.url}`)
        })
    })

    return parsed.join('\n');
}

const sticker = async (context , next) => {
    
    if (context.hasReplyMessage) {
        context.loadMessagePayload()
        const replyMessage = context.replyMessage.getAttachments('sticker');

        if (replyMessage.length) {
            await context.send(parsedData(replyMessage));
        }
        else {
            await context.send("Нет вложений или во вложении не стикер.");
        }
    }
    else {
        await context.send("Команда должна быть ответом на сообщение с стикером.")
    }
}


module.exports = [
    {
        hear: '/stick',
        execute: sticker
    } 
];