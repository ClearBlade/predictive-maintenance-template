/**
* The 'parser' variable is the entry point for your parser. Write logic inside of the provided function and return a value
* Constants and utility functions can be created outside of the parser
* The provided ctx parameter is an object that contains data and model information on this item
* @param {context} ctx 
* @returns {rtn} */
parser = (ctx) => {
  /** @type {GridSourceObj} */
  var gridData = {
    keyColumn: "item_id", 
    data: [], 
    columns: ctx.dsModel.getCRUDSchema(), 
    count: ctx.dsModel.getCount()
  };

  for (var row of ctx.datasource) {
    // gridData.data.unshift(row.data)
    gridData.data.push(row.data)
  }

  return gridData;
}