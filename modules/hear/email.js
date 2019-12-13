const utils = require('../../utils.js');

const EMAIL_ADDRES_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_ADDRES_REGEXP_RAW = /^\/raw (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let emailInfoString = (data) => {
	if (typeof data != 'undefined') {
		return `
		✅Уровень репутации e-mail: ${getLocalizationLevelString(data.reputation)}
		⚠Должна ли почта рассматриваться как подозрительная: ${getLocalizationAnswerString(data.suspicious)}
		📉Общее количество положительных и отрицательных источников репутации: ${data.references}

		Подробная информация

		🚫Почта занесена в черный список как спамовая или вредоносная: ${getLocalizationAnswerString(data.details.blacklisted)}
		⚠Замечена ли вредоносная активность: ${getLocalizationAnswerString(data.details.malicious_activity)}
		⚠Замечена ли вредоносная активность за последние 90 дней: ${getLocalizationAnswerString(data.details.malicious_activity_recent)}
		🔒Были ли утечки учетных данных: ${getLocalizationAnswerString(data.details.credentials_leaked)}
		🔒Были ли утечки данных за последние 90 дней: ${getLocalizationAnswerString(data.details.credentials_leaked_recent)}
		🔒Была ли взломана электронная почта: ${getLocalizationAnswerString(data.details.data_breach)}
		
		✅Уровень репутации домена электронной почты: ${getLocalizationLevelString(data.details.domain_reputation)}
		✅Действительный домен: ${getLocalizationAnswerString(data.details.domain_exists)}
		🆓Использует ли почта бесплатный домен: ${getLocalizationAnswerString(data.details.free_provider)}
		🆕Домен был создан меньше года назад: ${getLocalizationAnswerString(data.details.new_domain)}
		⏰Дней с создания домена: ${data.details.days_since_domain_creation}
		📅Электронная почта использует временный / одноразовый сервис: ${getLocalizationAnswerString(data.details.disposable)}

		📋Достаточно ли строгая запись SPF для предотвращения подмены: ${getLocalizationAnswerString(data.details.spf_strict)}
		📋DMARC настроен правильно и применяется: ${getLocalizationAnswerString(data.details.dmarc_enforced)}
		📋Имеет запись MX:  ${getLocalizationAnswerString(data.details.valid_mx)}
		📋Может ли использоваться для спуфинга: ${getLocalizationAnswerString(data.details.spoofable)}

		${ (Array.isArray(data.details.profiles) && data.details.profiles.length) ? `🌚Онлайн сервисы в которых замечено использование данной почты: ${data.details.profiles}` : ``}
		`;
	}
	else {
		throw new Error(`Error parsed data :(`)
	}
}

let getLocalizationAnswerString = (answer) => {
	return answer ? `Да` : `Нет`
}

let getLocalizationLevelString = (answer) => {
	if (answer === `low`) {
		return `Низкий`; 
	}
	else if (answer === `medium`) {
		return `Средний`;
	}
	else if (answer === `high`) {
		return `Высокий`;
	}
	else if  (answer === `none` || answer === `n/a`) {
		return `Неизвестен`
	}
	else {
		return answer;
	}
}

const clean = async(context, vk) => {
	try {
        await context.send(`${emailInfoString(await utils.getDataFromAPI(`https://emailrep.io/${context.text}`))}`)
    } catch (error) {
        await Promise.all([
            await context.send(String(`${error.name} : ${error.message}`)),
            console.log(error)
        ]);
    }
}

const raw = async(context, vk) => {
	try {
        await context.send(`${utils.toStringJSON(await utils.getDataFromAPI(`https://emailrep.io/${context.text.replace('/raw', '').replace(' ', '')}`))}`);
    } catch (error) {
        await Promise.all([
            context.send(String(`${error.name} : ${error.message}`)),
            console.log(error)
        ]);
    }
}


module.exports = [
	{
		hear: EMAIL_ADDRES_REGEXP_RAW,
		execute: raw
	},
	{
		hear: EMAIL_ADDRES_REGEXP,
		execute: clean
	}
];