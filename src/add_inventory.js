(params) => {
  const data = params.data;
  const region_index = 0;
  const item_type_index = 2;
  const inventory_index = data[0].length;

  const enriched_data = data.map(r => {
    const region = r[region_index];
    const item_type = r[item_type_index];
    const inventory = 10000; // could look up inventory
    r[inventory_index] = inventory;
    return r;
  });

  return enriched_data;
}