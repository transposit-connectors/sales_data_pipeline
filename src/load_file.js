(params) => {
  // https://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
  const CSVToArray = {
    parse: function(csv, reviver) {
      reviver = reviver || function(r, c, v) {
        return v;
      };
      var chars = csv.split(''),
        c = 0,
        cc = chars.length,
        start, end, table = [],
        row;
      while (c < cc) {
        table.push(row = []);
        while (c < cc && '\r' !== chars[c] && '\n' !== chars[c]) {
          start = end = c;
          if ('"' === chars[c]) {
            start = end = ++c;
            while (c < cc) {
              if ('"' === chars[c]) {
                if ('"' !== chars[c + 1]) {
                  break;
                } else {
                  chars[++c] = '';
                } // unescape ""
              }
              end = ++c;
            }
            if ('"' === chars[c]) {
              ++c;
            }
            while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) {
              ++c;
            }
          } else {
            while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) {
              end = ++c;
            }
          }
          row.push(reviver(table.length - 1, row.length, chars.slice(start, end).join('')));
          if (',' === chars[c]) {
            ++c;
          }
        }
        if ('\r' === chars[c]) {
          ++c;
        }
        if ('\n' === chars[c]) {
          ++c;
        }
      }
      return table;
    },

    stringify: function(table, replacer) {
      replacer = replacer || function(r, c, v) {
        return v;
      };
      var csv = '',
        c, cc, r, rr = table.length,
        cell;
      for (r = 0; r < rr; ++r) {
        if (r) {
          csv += '\r\n';
        }
        for (c = 0, cc = table[r].length; c < cc; ++c) {
          if (c) {
            csv += ',';
          }
          cell = replacer(r, c, table[r][c]);
          if (/[,\r\n"]/.test(cell)) {
            cell = '"' + cell.replace(/"/g, '""') + '"';
          }
          csv += (cell || 0 === cell) ? cell : '';
        }
      }
      return csv;
    }
  };

  const file_url_array = params.file_url.split(/\//);
  const bucket = file_url_array[2];
  const key = params.file_url.split("://" + bucket + "/")[1];

  const file_contents = api.run("this.get_object", {
    bucket: bucket,
    key: key
  })[0];
  const results = CSVToArray.parse(file_contents);
  return results.slice(1, results.length);

  //   const cols = results[0];

  //   let data = results.slice(1, results.length);

  //   let processed_data = data.map((row) => {
  //     let obj = {};
  //     row.forEach(function(item, index) {
  //       let label = cols[index];
  //       obj[label] = row[index];
  //       return obj;
  //     });
  //     return obj;
  //   })

  //   return processed_data;
}