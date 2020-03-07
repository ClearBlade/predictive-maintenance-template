/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */
parser = (ctx) => {
  var flag = datasources.stopFlag.latestData().val;
  if (flag == 0){
    datasources.stopFlag.sendData({"val" : 1});
    datasources.publishFlag.sendData({"val" : 0});
    alert("Publishing Stopped")
  } else {
    alert("System is currently not publishing any messages");
  }
  return {};
}