# BotVK
 Чат-бот ВКонтатке

# Настройка
 Все настройки бота находятся в файле `config.json`


 ``` js
 {
	"TOKEN": "", /* Токен сообщества
	"group_id": "", /* ID - сообщества для использования GroupPolling */
	"admins": [], /* Список ID администраторов */
	"is_explicit": true
 }
 ```

 Токен сообщества указывать в файле `.env` либо в `config.json`
 
 ``` js
 TOKEN=""
 
 ```
# Создание плагина
 Плагины бота расположены в `plugins/`. 

 Для [hear](https://github.com/negezor/vk-io/blob/master/docs/ru/api-reference/updates.md#hear) в  `plugins/hear`.
 Для [on](https://github.com/negezor/vk-io/blob/master/docs/ru/api-reference/updates.md#on) в `plugins/on`.

## Шаблон плагина

Шаблон для hear: 

```js
	const handler = async (cxt, vk) => {
		// some code ...
	}

	module.exports = [
		{
			hear: '/text', // Подробнее: https://github.com/negezor/vk-io/blob/master/docs/ru/api-reference/updates.md#hear
			execute: handler 
		}
	]

```

Шаблон для on:	

```js
	const hander = async (cxt, vk) => {
		// some code...
	}

	module.exports = [
		{
			type: 'message', // Подробнее: https://github.com/negezor/vk-io/blob/master/docs/ru/api-reference/updates.md#on 
			execute: handler
		}
	]

```