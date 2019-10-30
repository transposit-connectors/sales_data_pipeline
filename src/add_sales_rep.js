(params) => {
  const data = params.data;
  const region_index = 0;
  const offline_online_index = 3;
  const sales_rep_index = data[0].length;
  const region_to_sales_rep = {
    "Australia and Oceania": {
      Offline: "AOperson1",
      Online: "AOperson2",
      default: "AOperson3"
    },
    "Central America and the Caribbean": {
      Offline: "CAperson1",
      Online: "CAperson2",
      default: "CAperson3"
    },
    "Europe": {
      Offline: "Eperson1",
      Online: "Eperson2",
      default: "Eperson3"
    },
    "Sub-Saharan Africa": {
      Offline: "SSAperson1",
      Online: "SSAperson2",
      default: "SSAperson3"
    },
    "Asia": {
      Offline: "Aperson1",
      Online: "Aperson2",
      default: "Aperson3"
    },
    "Middle East and North Africa": {
      Offline: "MENAperson1",
      Online: "MENAperson2",
      default: "MENAperson3"
    },
    "North America": {
      Offline: "MENAperson1",
      Online: "MENAperson2",
      default: "MENAperson3"
    },
  }
  enriched_data = data.map(r => {
    const region = r[region_index];
    const offline_online = r[offline_online_index];
    let sales_rep = "default rep";
    if (region_to_sales_rep[region]) {
      if (region_to_sales_rep[region][offline_online]) {
        sales_rep = region_to_sales_rep[region][offline_online];
      } else {
        console.log("defaulting, didn't find region/onlineoffline: " + region + ", " + offline_online);
        sales_rep = region_to_sales_rep[region]['default'];
      }
    } else {
      console.log("defaulting, didn't find region: " + region);
    }
    r[sales_rep_index] = sales_rep;
    return r;
  });

  return enriched_data;
}