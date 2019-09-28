var fetch = require('node-fetch')
const { execSync } = require("child_process")


var getDataFromAPI = async (url) => {
    let response = await fetch(`${url}`)
    if (response.ok) {
        let data = await response.json()
        return await data;
    }
    
    throw new Error(response.status)
}

var toStringJSON =  async (data) => {
    return await JSON.stringify(data, null, '\t');
}

var getGitCommitHash = () => {
    gitCommand = `git rev-parse HEAD`;
    return execSync(gitCommand).toString().trim();
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    var time    = hours + ':' + minutes +':' + seconds;
    return time;
}

var uptime = async () => {
    return await (process.uptime() + "").toHHMMSS();
}

var getDateTime = (date) => {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).substr(-2);
    var day = ("0" + date.getDate()).substr(-2);
    var hour = ("0" + date.getHours()).substr(-2);
    var minutes = ("0" + date.getMinutes()).substr(-2);
    var seconds = ("0" + date.getSeconds()).substr(-2);

    return day + "." + month + "." + year + " " + hour + ":" + minutes + ":" + seconds;
}

var convertDateToUTC = () => {
    var date = new Date();
    date.toLocaleString("ru-RU", {timeZone: "Europe/Moscow"}) 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
 

module.exports = {
    getDateTime,
    convertDateToUTC,
    uptime,
    getDataFromAPI,
    getGitCommitHash,
    toStringJSON
};