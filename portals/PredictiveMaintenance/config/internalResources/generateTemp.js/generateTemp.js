setInterval(
    function() {
        val = Math.random() * (100 - 60) + 60;
        val = val.toFixed(2)
        var data = datasources.sensorValues.latestData()
        // data['temp'] = val;
        datasources.sensorValues.sendData({...data, temp : val});
    },
    5000
)