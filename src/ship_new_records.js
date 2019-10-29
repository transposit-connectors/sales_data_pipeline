(params) => {
  const data = params.data;
  const operations = [];
  const insert_op_name = "this.execute_dw_insert";
  
  data.forEach(r => {
    const one_operation = [];
    operation.push(insert_op_name);
    const parameters = {};
    parameters.region = r[0];
    parameters.country = r[1];
    parameters.country = r[1];
     
    operation.push()
    api.run("this.execute_dw_insert", {});  
    operations.push(one_operation);
  });
  
  api.runBulk(operations); 
  region
             + @country+","+
           + @item_type+","+
           + @sales_channel+","+
           + @order_priority+","+
           + @order_date+","+
           + @order_id+","+
           + @ship_date+","+
           + @units_sold+","+
           + @unit_price+","+
           + @unit_cost+","+
           + @total_revenue+","+
           + @total_cost+","+
           + @unit_profit+
  api.run("this.execute_dw_insert", {});
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */