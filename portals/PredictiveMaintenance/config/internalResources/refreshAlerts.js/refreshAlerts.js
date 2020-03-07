setInterval(function(){
    var query = datasources.Alerts.lastDataSent
    // console.log(query);
    datasources.Alerts.sendData(query);
}, 1000)