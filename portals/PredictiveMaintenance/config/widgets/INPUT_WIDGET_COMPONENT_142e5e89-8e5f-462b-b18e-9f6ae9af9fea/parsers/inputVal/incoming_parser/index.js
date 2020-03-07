/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */




// setInterval(
    parser = (ctx) => {
        // val = Math.random() * (2 - 0) + 0;
        // val = val.toFixed(7)
        // var data = datasources.sensorValues.latestData()
        // // datasources.sensorValues.sendData({'acc' : val});
        // data['acc'] = val
        return { widgetData: ctx.datasource.acc }
    }
// )