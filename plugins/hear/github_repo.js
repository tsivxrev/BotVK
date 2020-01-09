const fetch = require('node-fetch');
const {convertTime} = require('../../utils');

const GITHUB_REPO_REGEXP = /^\/git (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*))?/;


const getGitHubRepo = async (context, vk) => {
	try {
		let repo = context.text.replace('/git', '').replace(' ', '');
		await context.send(toHumanReadingData(await getDataFromAPI(`https://api.github.com/repos/${repo}`)));
	} catch (e) {
		context.send(String(`${e.name} : ${e.message}`));
	}
}

let getDataFromAPI = async (url) => {
    let response = await fetch(url);
    
    let data = response.json();
   	return data;
}

let toHumanReadingData = (data) => {
	if (data.message) {
		return data.message;
	}

	return `ID: ${data.id}`+ `\n` +
	`Name: ${data.name}`+ `\n` +
	`Full Name: ${data.full_name}`+ `\n` +
	`Description: ${data.description}`+ `\n` +
	``+ `\n` +
	`Language: ${data.language}`+ `\n` +
	``+ `\n` +
	`Private: ${data.private}`+ `\n` +
	``+ `\n` +
	`Created: ${convertTime(data.created_at)}`+ `\n` +
	`Updated: ${convertTime(data.updated_at)}`+ `\n` +
	`Pushed: ${convertTime(data.pushed_at)}`+ `\n` +
	``+ `\n` +
	`Default Branch: ${data.default_branch}`+ `\n` +
	``+ `\n` +
	`Stars: ${data.stargazers_count}`+ `\n` +
	`Open Issues: ${data.open_issues}`+ `\n` +
	`Forks: ${data.forks}`+ `\n` +
	`Watchers: ${data.subscribers_count}`+ `\n` +
	``+ `\n` +
	`URL: ${data.html_url}`+ `\n` +
	`Homepage URL: ${data.homepage}`+ `\n` +
	`Git URL: ${data.git_url}`+ `\n` +
	`SSH URL: ${data.ssh_url}` + `\n`
}


module.exports = [
	{
		hear: GITHUB_REPO_REGEXP,
		execute: getGitHubRepo	
	}
]