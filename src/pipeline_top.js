(params) => {
 
  //load file from url
  //Region,Country,Item Type,Sales Channel,Order Priority,Order Date,Order ID,Ship Date,Units Sold,Unit Price,Unit Cost,Total Revenue,Total Cost,Total Profit
  const order_id_index = 6;
  const file_records = api.run("this.load_file",{file_url: params.file_url});
  const file_ids = file_records.map(r => { return r[order_id_index]; });
  
   // grab existing record ids from data warehouse. assumes orderid is immutable
  const existing_records = api.run("this.get_existing_records");
  const existing_record_ids = existing_records.map(r => {return r[order_id_index];});
  
  const ids_to_be_processed = file_ids.filter(i => { return !existing_record_ids.includes(i); } );
  const new_records = file_records.filter(r => { return ids_to_be_processed.includes(r[order_id_index])});
  
  // add sales rep based on channel and region
  const records_with_sales_rep = api.run("this.add_sales_rep",{data: new_records});
// console.log(records_with_sales_rep);
  
//   // add inventory from db
  const records_with_inventory = api.run("this.add_inventory",{data: records_with_sales_rep});
  // console.log(records_with_inventory);
  
  // any records with small inventory amounts, mark as such
  const records_with_inventory_warning = api.run("this.add_inventory_warning",{data: records_with_inventory});
  
  // push total profits to google sheets for exec dashboards
  const totals = api.run("this.generate_region_totals",{data: records_with_inventory_warning});
  // console.log(totals);

  let res = api.run("this.ship_totals_to_google_sheets",{totals: totals})[0];
  if (!res.success) {
    console.log("error with updating google spreadsheets");
  }

  // push all to data warehouse
  res = api.run("this.ship_new_records", {data: records_with_inventory }); 
  return res;
}
