let data = [
    {
        "id": 13429,
        "productId": 379,
        "images": [
            {
                "url": "https://vk.com/sticker/1-13429-64",
                "width": 64,
                "height": 64
            },
            {
                "url": "https://vk.com/sticker/1-13429-128",
                "width": 128,
                "height": 128
            },
            {
                "url": "https://vk.com/sticker/1-13429-256",
                "width": 256,
                "height": 256
            },
            {
                "url": "https://vk.com/sticker/1-13429-352",
                "width": 352,
                "height": 352
            },
            {
                "url": "https://vk.com/sticker/1-13429-512",
                "width": 512,
                "height": 512
            }
        ],
        "imagesWithBackground": [
            {
                "url": "https://vk.com/sticker/1-13429-64",
                "width": 64,
                "height": 64
            },
            {
                "url": "https://vk.com/sticker/1-13429-128",
                "width": 128,
                "height": 128
            },
            {
                "url": "https://vk.com/sticker/1-13429-256",
                "width": 256,
                "height": 256
            },
            {
                "url": "https://vk.com/sticker/1-13429-352",
                "width": 352,
                "height": 352
            },
            {
                "url": "https://vk.com/sticker/1-13429-512",
                "width": 512,
                "height": 512
            }
        ]
    },
     {
        "id": 13429,
        "productId": 379,
        "images": [
            {
                "url": "https://vk.com/sticker/1-13429-64",
                "width": 64,
                "height": 64
            },
            {
                "url": "https://vk.com/sticker/1-13429-128",
                "width": 128,
                "height": 128
            },
            {
                "url": "https://vk.com/sticker/1-13429-256",
                "width": 256,
                "height": 256
            },
            {
                "url": "https://vk.com/sticker/1-13429-352",
                "width": 352,
                "height": 352
            },
            {
                "url": "https://vk.com/sticker/1-13429-512",
                "width": 512,
                "height": 512
            }
        ],
        "imagesWithBackground": [
            {
                "url": "https://vk.com/sticker/1-13429-64",
                "width": 64,
                "height": 64
            },
            {
                "url": "https://vk.com/sticker/1-13429-128",
                "width": 128,
                "height": 128
            },
            {
                "url": "https://vk.com/sticker/1-13429-256",
                "width": 256,
                "height": 256
            },
            {
                "url": "https://vk.com/sticker/1-13429-352",
                "width": 352,
                "height": 352
            },
            {
                "url": "https://vk.com/sticker/1-13429-512",
                "width": 512,
                "height": 512
            }
        ]
    }    
];

let parsedData = (data) => {
    let parsed = [];

    data.forEach((r) => {
        parsed.push(`ID стикера: ${r['id']}`)
        parsed.push(`ID продукта: ${r['productId']}`)
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

/*console.log(parsedData(data))*/