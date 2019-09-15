const utils = require('./utils.js')


const EMAIL_ADDRESS_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_ADDRESS_REGEXP_RAW = /^\/raw (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

var emailInfoString = async (data) => {
	if (typeof data != 'undefined') {
		return await `
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
		⚠Поддельный ли адрес электронной почты: ${getLocalizationAnswerString(data.details.spoofable)}
		📅Электронная почта использует временный / одноразовый сервис: ${getLocalizationAnswerString(data.details.disposable)}

		📋Достаточно строгая запись SPF для предотвращения подмены: ${getLocalizationAnswerString(data.details.spf_strict)}
		📋DMARC настроен правильно и применяется: ${getLocalizationAnswerString(data.details.dmarc_enforced)}
		📋Имеет запись MX:  ${getLocalizationAnswerString(data.details.valid_mx)}

		🌚Онлайн сервисы в которых замечено использование данной почты: ${data.details.profiles}
		`;
	}
	else {
		throw new Error(`Can not parsed data.`)
	}
}

var getLocalizationAnswerString = (answer) => {
	return answer ? `Да` : `Нет`
}

var getLocalizationLevelString = (answer) => {
	if (answer === `low`) {
		return `Низкий`; 
	}
	else if (answer === `medium`) {
		return `Средний`;
	}
	else if (answer === `high`) {
		return `Высокий`;
	}
	else if  (answer === `none`) {
		return `Неизвестен`
	}
	else {
		return answer;
	}
}


module.exports = {
	emailInfoString, 
	EMAIL_ADDRESS_REGEXP,
	EMAIL_ADDRESS_REGEXP_RAW
};