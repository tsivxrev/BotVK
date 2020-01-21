const { execSync } = require("child_process");

let fetch = require('node-fetch');


let getDataFromAPI = async (url) => {
    let response = await fetch(url);
    
    if (response.ok) {
        let data = response.json();
        return data;
    }
    
    throw new Error(`[Status: ${response.status}] - ${await response.text()}`);
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

let convertTime = (dateTimeISO) => {
    let d = new Date(dateTimeISO);
    
    let year = d.getFullYear();
    let month = ("0" + (d.getMonth() + 1)).substr(-2);
    let day = ("0" + d.getDate()).substr(-2);
    let hour = ("0" + d.getHours()).substr(-2);
    let minutes = ("0" + d.getMinutes()).substr(-2);
    let seconds = ("0" + d.getSeconds()).substr(-2);

    return day + "." + month + "." + year + " " + hour + ":" + minutes + ":" + seconds;
}

let getDateTimes = (timeZone) => {
    let options = {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit', 
        timeZone: timeZone || "UTC", 
        timeZoneName: 'long',
        hour12: false
    }
    
    let d = new Date();
    return d.toLocaleTimeString('en-GB', options);
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
    getDateTimes,
    convertTime,
    uptime,
    getDataFromAPI,
    getGitCommitHash,
    toStringJSON
};