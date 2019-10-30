(params) => {
  const dw_rows = api.run("this.execute_dw_query", {
    big_query_project_id: env.get('big_query_project_id'),
    table: env.get('big_query_table_name')
  })[0].rows;
  const arr = [];

  // convert to row based format from API
  dw_rows.forEach(r => {
    const one_row = [];
    r.f.forEach(v => {
      one_row.push(v.v);
    })
    arr.push(one_row);
  });
  return arr;
}