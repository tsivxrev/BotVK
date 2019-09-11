var fetch = require('node-fetch')


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
    getDataFromAPI,
    toStringJSON
};