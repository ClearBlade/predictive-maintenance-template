
setInterval(function() {
    val = Math.random() * (2 - 0) + 0;
    val = val.toFixed(7)
    var data = datasources.sensorValues.latestData()
    // data['acc'] = val
    datasources.sensorValues.sendData({...data, acc : val});
}, 5000)
