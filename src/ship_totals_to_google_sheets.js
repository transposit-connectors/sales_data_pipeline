(params) => {
  const totals = params.totals[0];
  const sheet_id = env.get('executive_report_google_sheet');
  const keys = Object.keys(totals);

  const sheet_range = 'a1:b' + keys.length;

  const first_column = keys;
  const second_column = keys.map(k => {
    return totals[k];
  });
  const values = [first_column, second_column];

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