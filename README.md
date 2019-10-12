# BotVK
 Чат-бот ВКонтатке

# Настройка
 Все настройки бота находятся в файле `config.json`

<!-- 10 строка в файле bot.js -->
 ``` js
 {
	"TOKEN": "", /* Токен сообщества (неохобходимо заменить код в bot.js с token: process.env.TOKEN, на token: config.TOKEN)*/
	"group_id": "" /* ID - сообщества для использования GroupPolling */
	"is_explicit": true
 }
 ```

 Токен сообщества указывать в файле `.env`
 
 ``` js
 TOKEN=""
 
 ```