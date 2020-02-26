const { execSync } = require("child_process");

let fetch = require('node-fetch');


const STATUS_CODES = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',                 // RFC 2518, obsoleted by RFC 4918
  103: 'Early Hints',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',               // RFC 4918
  208: 'Already Reported',
  226: 'IM Used',
  300: 'Multiple Choices',           // RFC 7231
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',         // RFC 7238
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a Teapot',              // RFC 7168
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',       // RFC 4918
  423: 'Locked',                     // RFC 4918
  424: 'Failed Dependency',          // RFC 4918
  425: 'Unordered Collection',       // RFC 4918
  426: 'Upgrade Required',           // RFC 2817
  428: 'Precondition Required',      // RFC 6585
  429: 'Too Many Requests',          // RFC 6585
  431: 'Request Header Fields Too Large', // RFC 6585
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',    // RFC 2295
  507: 'Insufficient Storage',       // RFC 4918
  508: 'Loop Detected',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',               // RFC 2774
  511: 'Network Authentication Required' // RFC 6585
};

let getDataFromAPI = async (url) => {
    let response = await fetch(url);
    
    if (response.ok) {
        let data = response.json();
        return data;
    }
    
    throw new Error(`[Status: ${response.status}] - ${STATUS_CODES[response.status] || ':('}`);
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

let declOfNum = (num, titles) => {
    return titles[(num % 10 === 1 && num % 100 !== 11) ? 0 : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? 1 : 2]
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

Object.prototype.randElement = function (){
    var rand = Math.floor(Math.random() * this.length);
    
    return this[rand];
}


module.exports = {
    getDateTimes,
    convertTime,
    uptime,
    declOfNum,
    getDataFromAPI,
    getGitCommitHash,
    toStringJSON,
    randElement
};