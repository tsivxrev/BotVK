const { execSync } = require("child_process");

let fetch = require('node-fetch');


let getDataFromAPI = async (url) => {
    let response = await fetch(url);
    
    if (response.ok) {
        let data = response.json();
        return data;
    }
    
    throw new Error(response.status);
}

let toStringJSON = (data) => {
    return JSON.stringify(data, null, '\t');
}

let getGitCommitHash = (long=true) => {
    try {
        let gitCommand = long ? `git rev-parse HEAD` : `git rev-parse --short HEAD`;
        return execSync(gitCommand).toString().trim();
    } catch (ignore) {
        return `Error get git-hash :(`;
    }
}

let uptime = () => {
    return (process.uptime() + "").toHHMMSS();
}

let isEmptyString = (str) => {
    if (str) {
        return false;
    }
    
    return true;
}

let getDateTime = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).substr(-2);
    let day = ("0" + date.getDate()).substr(-2);
    let hour = ("0" + date.getHours()).substr(-2);
    let minutes = ("0" + date.getMinutes()).substr(-2);
    let seconds = ("0" + date.getSeconds()).substr(-2);

    return day + "." + month + "." + year + " " + hour + ":" + minutes + ":" + seconds;
}

let convertDateToUTC = () => {
    let date = new Date();
    date.toLocaleString("ru-RU", {timeZone: "Europe/Moscow"}) 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
 
String.prototype.toHHMMSS = function () {
    let sec_num = parseInt(this, 10); // don't forget the second param
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    let time    = hours + ':' + minutes +':' + seconds;
    return time;
}


module.exports = {
    getDateTime,
    convertDateToUTC,
    uptime,
    getDataFromAPI,
    getGitCommitHash,
    toStringJSON,
    isEmptyString
};