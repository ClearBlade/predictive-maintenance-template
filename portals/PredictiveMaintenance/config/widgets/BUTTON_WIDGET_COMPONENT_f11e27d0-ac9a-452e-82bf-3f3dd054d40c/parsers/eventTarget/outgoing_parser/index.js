/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */
parser = (ctx) => {
  var topic = datasources.subscribe.latestData();
  // console.log(topic)
  console.log(topic);

  if(topic == undefined || topic == ""){
    alert("Cannot Subscribe to a blank topic.");
  } else {
    alert("Subscribed to a Topic");
  }
  return {};
}