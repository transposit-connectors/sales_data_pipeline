(params) => {
  const moment = require('moment.js');
  const data = params.data;
  const bq_project_id = env.get('big_query_project_id');
  const bq_table_name = env.get('big_query_table_name');

  let count = 0;
  for (let r of data) {
    const parameters = {};
    parameters.region = r[0].replace(/'/g, "\\\'");
    parameters.country = r[1].replace(/'/g, "\\\'");
    parameters.item_type = r[2].replace(/'/g, "\\\'");
    parameters.sales_channel = r[3].replace(/'/g, "\\\'");
    parameters.order_priority = r[4].replace(/'/g, "\\\'");
    parameters.order_date = moment(r[5]).format('Y-M-D');
    parameters.order_id = parseInt(r[6]);
    parameters.ship_date = moment(r[7]).format('Y-M-D');
    parameters.units_sold = parseInt(r[8]);
    parameters.unit_price = parseFloat(r[9]);
    parameters.unit_cost = parseFloat(r[10]);
    parameters.total_revenue = parseFloat(r[11]);
    parameters.total_cost = parseFloat(r[12]);
    parameters.total_profit = parseFloat(r[13]);

    let sql = "SELECT * FROM gcp_bigquery.execute_query WHERE projectId='" + bq_project_id + "' AND $body=(SELECT { 'useLegacySql' : false, 'query' : ";

    const bqsql = "INSERT into `" + bq_table_name + "` (Region, Country, Item_Type, Sales_Channel, Order_Priority, Order_Date, Order_ID, Ship_Date, Units_Sold, Unit_Price, Unit_Cost, Total_Revenue, Total_Cost, Total_Profit) VALUES ('" +
      parameters.region + "','" + parameters.country + "','" + parameters.item_type + "', '" + parameters.sales_channel + "', '" +
      parameters.order_priority + "', '" + parameters.order_date + "', " + parameters.order_id + ", '" + parameters.ship_date + "', " +
      parameters.units_sold + ", " + parameters.unit_price + ", " + parameters.unit_cost + ", " + parameters.total_revenue + ", " +
      parameters.total_cost + ", " + parameters.total_profit + ")";
    sql = sql + '"' + bqsql + '"' + "  })";

    // console.log(sql);
    let success = true;
    try {
      api.query(sql, parameters);
      count++;
    } catch (e) {
      console.log(e);
      success = false;
    }

    // console.log(success);
    if (!success) {
      break;
    }
  }

  return {
    success: count == data.length,
    count: count
  };
}