## What is this

This is a sample data pipeline implemented using the Transposit platform.

This data is all *fake*. It is pulled from [this sample data](http://eforexcel.com/wp/downloads-18-sample-csv-files-data-sets-for-testing-sales/).

The daily sales data that is dropped into an S3 bucket by some other process.

We want to process that data and enrich it with additional information. We only want to process new orders. For these orders, we want to add who the sales lead was and the the inventory level. For this example, these enrichments are mocked up, but you could easily [add a new data connector](https://www.transposit.com/docs/references/create-a-data-connector/) which would reach out to internal APIs. 

We want to push a summation of each region's sales totals to a Google spreadsheet (perhaps for executive dashboard) and add all new orders to a data warehouse.

## Before you start

## Running this

add production keys for the three data connectors

create a big table dataset and table (I did this manually)

timeout

set up google sheet

use different dataset, need to change the logic and the insert statements. based on arrays

scheduled task

http://eforexcel.com/wp/downloads-18-sample-csv-files-data-sets-for-testing-sales/

inline doco

tiemouts/idempotent
escaping the bigquery query

## Go further

* Take action when the inventory levels are too low (send an [email with SendGrid](/docs/references/connectors/sendgrid-documentation/) or [post to Slack](/docs/references/connectors/slack-documentation/))
* Push the logic for adding the sales rep to [a lambda](/blog/2019.10.07-basics-of-lambda/) and call that instead of adding the data in a Transposit operation.

