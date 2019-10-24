(params) => {

  //load file from url
  const file_records = api.run("this.load_file",{file_url: params.file_url});
  return file_records;
  
//   // grab existing record ids from data warehouse
//   const existing_record_ids = api.run("this.get_existing_records");
  
//   // get the new records to be processed
//   const records = api.run("this.load_records",{existing_record_ids: existing_record_ids, file_records: file_records});
  
//   // add sales rep based on channel and region
//   const records_with_sales_rep = api.run("this.add_sales_rep",{data: records});
  
//   // add inventory from db
//   const records_with_inventory = api.run("this.add_inventory",{data: records});
  
//   // any records with small inventory amounts, send off to inventory warning system
//   const records_with_inventory_warning = api.run("this.add_inventory_warning",{data: records});
//   let res = api.run("ship_low_inventory_records", {data: records_with_inventory_warning});
//   if (!res.success) {
//     console.log("error with low inventory");
//   }
  
//   // push totals to google sheets for exec dashboards
//   const totals = api.run("this.generate_country_totals",{data: records_with_sales_rep});
//   res = api.run("this.ship_totals_to_google_sheets",{data: totals});
//   if (!res.success) {
//     console.log("error with low inventory");
//   }
  
//   // push all to data warehouse
//   res = api.run("this.ship_new_records")  
  
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */