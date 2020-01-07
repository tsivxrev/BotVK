const info = require('../../package.json');
const utils = require('../../utils.js');


const about = async(context, vk) => {
	await context.send(`
	${info.name} - ${info.description}
	Версия: ${info.version}
	Git: ${utils.getGitCommitHash(false)}
	Разработчик: @rejson (Иван) | @es3n1n (Арсений)
	Платформа: Node JS ${info.engines.node}.
	Используемая библиотека: vk-io`);
}

module.exports = [
	{
		hear: '/about',
		execute: about
	}
]