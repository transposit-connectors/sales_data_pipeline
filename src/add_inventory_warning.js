(params) => {
  const data = params.data;
  const units_sold_index = 8;
  const inventory_index = 15;
  const inventory_warning_index = data[0].length;
  const warning_threshold = 1000;

  const enriched_data = data.map(r => {
    const units_sold = r[units_sold_index];
    const inventory = r[inventory_index];
    r[inventory_warning_index] = (r[inventory_index] - units_sold < warning_threshold);
    return r;
  });

  return enriched_data;
}