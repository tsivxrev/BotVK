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

var declOfNum = (number, titles) => {
    /* by FlyLnk13*/
    number = Math.abs(number);
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
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

Date.prototype.DiffString = [
    ["секунду", "* секунды", "* секунд"],
    ["минуту", "* минуты", "* минут"],
    ["час", "* часа", "* часов"],
    ["день", "* дня", "* дней"],
    ["год", "* года", "* лет"],
    ["через *", "* назад", "прямо сейчас"]
];

Date.prototype.toDiffString = function (offset, lang) {
    lang = lang || Date.prototype.DiffString;
    offset = offset || [60, 3600, 86400, 31557600];
    var now = Date.now();
    var _this = this.getTime();
    var diff = Math.floor(Math.abs(now - _this) / 1000);

    var response = [];
    for (var i = 0; i < offset.length; i++) {
        response.push(diff % offset[i]);
        if(i > 0) response[i] = Math.floor(response[i] / offset[i - 1]);
        diff -= response[i];
    }
    response = response
        .map((v, i) => declOfNum(v, lang[i]).replace("*", v))
        .filter(v => v[0] !== "0")
        .reverse();
    if(!response.length) return lang[5][2];
    return lang[5][(now > _this) * 1].replace("*", response.join(" "));
};


module.exports = {
    getDateTime,
    convertDateToUTC,
    uptime,
    getDataFromAPI,
    getGitCommitHash,
    toStringJSON
};