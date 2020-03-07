setInterval(function(){
    var query = datasources.MessageCollection.lastDataSent
    // console.log(query);
    datasources.MessageCollection.sendData(query);
}, 1000)