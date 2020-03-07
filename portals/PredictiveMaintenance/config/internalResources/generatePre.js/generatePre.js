setInterval(
    function() {
    val = Math.random() * (2000 - 1000) + 1000;
    val = val.toFixed(0)
    var data = datasources.sensorValues.latestData()
    datasources.sensorValues.sendData({...data, pow : val});
    }, 5000)