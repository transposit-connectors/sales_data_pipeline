(params) => {
 
  //load file from url
  //Region,Country,Item Type,Sales Channel,Order Priority,Order Date,Order ID,Ship Date,Units Sold,Unit Price,Unit Cost,Total Revenue,Total Cost,Total Profit
  const order_id_index = 6;
  const new_records = api.run("this.load_file",{file_url: params.file_url});
  const new_ids = new_records.map(r => { return r[order_id_index]; });
  
   // grab existing record ids from data warehouse. assumes orderid is immutable
  const existing_records = api.run("this.get_existing_records");
  const existing_record_ids = existing_records.map(r => {return r[order_id_index];});
  
  const ids_to_be_processed = new_ids.filter(i => { return !existing_record_ids.includes(i); } );
  const new_records = new_records.filter(r => { return ids_to_be_processed.includes(r[order_id_index])});
  
  // add sales rep based on channel and region
  const records_with_sales_rep = api.run("this.add_sales_rep",{data: records});
  
//   // add inventory from db
  const records_with_inventory = api.run("this.add_inventory",{data: records});
  
//   // any records with small inventory amounts, send off to inventory warning system
  const records_with_inventory_warning = api.run("this.add_inventory_warning",{data: records});
//   let res = api.run("ship_low_inventory_records", {data: records_with_inventory_warning});
  if (!res.success) {
    console.log("error with low inventory");
  }
  
//   // push totals to google sheets for exec dashboards
  const totals = api.run("this.generate_country_totals",{data: records_with_sales_rep});
  res = api.run("this.ship_totals_to_google_sheets",{data: totals});
  if (!res.success) {
    console.log("error with low inventory");
  }
  
//   // push all to data warehouse
   res = api.run("this.ship_new_records")  
  
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */