(params) => {
  const data = params.data;
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
    parameters.order_date = r[5];
    parameters.order_id = r[6];
    parameters.ship_date = r[7];
    parameters.units_sold = r[8];
    parameters.unit_price = r[9];
    parameters.unit_cost = r[10];
    parameters.total_revenue = r[11];
    parameters.total_cost = r[12];
    parameters.total_profit = r[13];
    
    one_operation.parameters = parameters;

    operations.push(one_operation);
  });
  
  let res = {};
  try{
    res = api.runBulk(operations); 
    res.success = true;
  } catch (e) {
    res.success = false;
    console.log(e);
  }

  return res;
}
