(params) => {
  const data = params.data;
  const region_index = 0;
  const profit_index = 13;
  
  const region_totals = data.reduce((total, r) => {
    const region = r[region_index];
    const profit = parseFloat(r[profit_index]);
    if (total[region]) {
      total[region] += profit;
    } else {
      total[region] = profit;
    }
    return total;
  },{});
  
  return region_totals;
}
