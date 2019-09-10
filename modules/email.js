const utils = require('./utils.js')


const EMAIL_ADRESS_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_ADRESS_REGEXP_RAW = /^\/raw (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

var emailInfoString = async (data) => {
	if (typeof data != 'undefined') {
		return await `
		📧E-mail: ${data.email}
		✅Уровень репутации e-mail: ${data.reputation}
		⚠Должна ли почта рассматриваться как подозрительная: ${data.suspicious}
		📉Общее количество положительных и отрицательных источников репутации: ${data.references}

		Подробная информация

		🚫Почта занесена в черный список как спамовая или вредоносная: ${data.details.blacklisted}
		⚠Замечена ли вредоносная активность: ${data.details.malicious_activity}
		⚠Замечена ли вредоносная активность за последние 90 дней: ${data.details.malicious_activity_recent}
		🔒Были ли утечки учетных данных: ${data.details.credentials_leaked}
		🔒Были ли утечки данных за последние 90 дней: ${data.details.credentials_leaked_recent}
		🔒Была ли взломана электронная почта: ${data.details.data_breach}
		
		✅Уровень репутации домена электронной почты: ${data.details.domain_reputation}
		✅Действительный домен: ${data.details.domain_exists}
		🆓Использует ли почта бесплатный домен: ${data.details.free_provider}
		🆕Домен был создан за посдедний год: ${data.details.new_domain}
		⏰Дней с создания домена: ${data.details.days_since_domain_creation}
		⚠Поддельный ли адрес электронной почты: ${data.details.spoofable}
		📅Электронная почта использует временный / одноразовый сервис: ${data.details.disposable}

		📋Достаточно строгая запись SPF для предотвращения подмены: ${data.details.spf_strict}
		📋DMARC настроен правильно и применяется: ${data.details.dmarc_enforced}
		📋Имеет запись MX:  ${data.details.valid_mx}

		🌚Онлайн сервисы в которых замечено использование данной почты: ${data.details.profiles}
		`;
	}
	else {
		throw new Error(`Can not parsed data.`)
	}
}


module.exports = {
	emailInfoString, 
	EMAIL_ADRESS_REGEXP,
	EMAIL_ADRESS_REGEXP_RAW
};