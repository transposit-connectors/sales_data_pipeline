(params) => {
  const totals = params.totals[0];
  const sheet_id = '1io8WEVl7MSk_RzmmWaMqofHMCA3f9X63R_k1g9EeG5k';
  const keys = Object.keys(totals);

  const sheet_range = 'a1:b' + keys.length;




  const first_column = keys;
  const second_column = keys.map(k => {
    return totals[k];
  });
  const values = [first_column, second_column];
  console.log(values);
  // return "";
  let res = {};
  try {
    api.run("this.update_sheet_values", {
      values: values,
      spreadsheet_id: sheet_id,
      range: sheet_range
    });
    res.success = true;
  } catch (e) {
    res.success = false;
    console.log(e);
  }
  return res;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */