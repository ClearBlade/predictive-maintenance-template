/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */
parser = (ctx) => {
  var message = datasources.message.latestData();
  var topic = datasources.subscribe.latestData();
  
  if(topic == "") {
    alert("Please Subscribe to a Topic");
  }
  
  else {
    datasources.PublishService.sendData({
      "topic" : topic,
      "payload" : message
    })

    datasources.PredictionService.sendData({
      "topic" : topic,
      "payload" : message
    })

    alert("Message Published");
  }
  
  return {};
}