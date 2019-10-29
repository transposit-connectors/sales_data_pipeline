(params) => {
  const data = params.data;
  //console.log(data);
  const operations = [];
  const insert_op_name = "this.execute_dw_insert";
  
  data.forEach(r => {
    const one_operation = {};
    one_operation.operation = insert_op_name;
    
    
    const parameters = {};
    parameters.region = r[0];
    parameters.country = r[1];
    parameters.item_type = r[2];
    parameters.sales_channel = r[3];
    parameters.order_priority = r[4];
    parameters.order_date = '2010-10-10'; //r[5].replace(/\//g,"-");
    parameters.order_id = parseInt(r[6]);
    parameters.ship_date = '2010-10-10'; //r[7].replace(/\//g,"-");
    parameters.units_sold = parseInt(r[8]);
    parameters.unit_price = parseFloat(r[9]);
    parameters.unit_cost = parseFloat(r[10]);
    parameters.total_revenue = parseFloat(r[11]);
    parameters.total_cost = parseFloat(r[12]);
    parameters.total_profit = parseFloat(r[13]);
    let sql = "SELECT * FROM gcp_bigquery.execute_query WHERE projectId='sales-data-pipeline' AND $body=(SELECT { 'useLegacySql' : false, 'query' : ";
    const bqsql = "INSERT into `default.orderdata` (Region, Country, Item_Type, Sales_Channel, Order_Priority, Order_Date, Order_ID, Ship_Date, Units_Sold, Unit_Price, Unit_Cost, Total_Revenue, Total_Cost, Total_Profit) VALUES (@region,@country,@item_type, @sales_channel, @order_priority, @order_date, @order_id, @ship_date, @units_sold, @unit_price, @unit_cost, @total_revenue, @total_cost, @total_profit)";
    sql = sql + "'" +bqsql + "'" + "  })";
    
    one_operation.parameters = parameters;
    console.log(parameters);
    console.log(sql);
    api.query(sql,parameters);
    //operations.push(one_operation);
    try {
      //api.run("this.execute_dw_insert", parameters);
    } catch (e) {
      console.log(e);
    }
  });
  
  let res = {};
  // try{
  //   res = api.runBulk(operations); 
  //   res.success = true;
  // } catch (e) {
  //   res.success = false;
  //   console.log(e);
  // }

  return res;
}
