(params) => {
  const data = params.data;
  const region_index = 0;
  const profit_index = 13;

  const region_totals = data.reduce((total, r) => {
    const region = r[region_index];
    const profit = Math.floor(parseFloat(r[profit_index]) * 100); // convert to pennies
    if (total[region]) {
      total[region] += profit;
    } else {
      total[region] = profit;
    }
    return total;
  }, {});

  Object.keys(region_totals).map(k => {
    const val = region_totals[k] / 100; // convert back from pennies.
    region_totals[k] = val;
  })

  return region_totals;
}