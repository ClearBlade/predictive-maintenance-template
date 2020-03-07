/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */

function execute(){
  var id = setInterval(
    function(){

      var pubFlag = datasources.publishFlag.latestData().val
      var stopFlag = datasources.stopFlag.latestData().val

      if(pubFlag == 1 && stopFlag == 0 )
      {
        var sensor_data = datasources.sensorValues.latestData();
        var message = datasources.message.latestData();  
        
        message["messages"].push(sensor_data);
        // datasources.message.sendData(sensor_data);

        var message = datasources.message.latestData();
        var topic = datasources.subscribe.latestData();  
        if(topic == "") {
          alert("Please Subscribe to a Topic");
        }
        
        else {
          // datasources.PublishService.sendData({
          //   "topic" : topic,
          //   "payload" : message
          // })

          var messages = message["messages"]

          datasources.PredictionService.sendData({
            "topic" : topic,
            "payload" : messages[messages.length - 1]
          })

          // console.log(datasources.timeInterval.latestData());
          console.log("Message Published");
        }
      } else {
        console.log("Interval Stopped");
        clearInterval(id);
      }

    }, datasources.timeInterval.latestData() * 1000
  )
}

parser = (ctx) => {
  
  var pubFlag = datasources.publishFlag.latestData().val;

  if(datasources.subscribe.latestData() == "" || datasources.subscribe.latestData() == undefined) {
    alert("Please Subscribe to a Topic");
    return {}
  }

  if(pubFlag == 1){
    alert("System is already publishing messages");
    return {};
  } else {
    datasources.publishFlag.sendData({"val" : 1});
    datasources.stopFlag.sendData({"val" : 0});
  }

  console.log(datasources.timeInterval.latestData());

  var interval = datasources.timeInterval.latestData();
  console.log(interval);
  if (interval == 0 || interval == undefined){
    alert("Setting default interval to 5 seconds");
    datasources.timeInterval.sendData({"time" : 5});
  }

  alert("Publishing a message after every " + datasources.timeInterval.latestData() + " seconds");

  execute();

  return {};
}