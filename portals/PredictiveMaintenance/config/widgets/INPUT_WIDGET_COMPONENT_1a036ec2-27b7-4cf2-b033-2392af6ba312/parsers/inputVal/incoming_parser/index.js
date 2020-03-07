/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */
parser = (ctx) => {
  // var data = datasources.timeInterval.latestData();
  // if(data["time"] == 0){
  //   return 0;
  // }

  return datasources.timeInterval["time"];
  // return ctx.datasource.time;
}