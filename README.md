## What is this

This is a sample data pipeline implemented using the Transposit platform.

This data is all *fake*. It is pulled from [this sample data](http://eforexcel.com/wp/downloads-18-sample-csv-files-data-sets-for-testing-sales/).

The daily sales data that is dropped into an S3 bucket by some other process.

We want to process that data and enrich it with additional information. We only want to process new orders. For these orders, we want to add who the sales lead was and the the inventory level. For this example, these enrichments are mocked up, but you could easily [add a new data connector](https://www.transposit.com/docs/references/create-a-data-connector/) which would reach out to internal APIs. 

We want to push a summation of each region's sales totals to a Google spreadsheet (perhaps for executive dashboard) and add all new orders to a data warehouse.

The pipeline looks like this:

```
S3 file -> filter out old orders -> add sales leads -> add inventory data -> sum up sales -> update Google sheets -> update BigQuery
```

## Before you start

You need to set up the following external resources:

### AWS

* an S3 bucket where the orders can be dropped. Create an `upload` and a `processed` folder. Download the `100 Sales Records.csv` file from [the sample data](http://eforexcel.com/wp/downloads-18-sample-csv-files-data-sets-for-testing-sales/) and upload it to the `upload` folder.
* an IAM user with `AmazonS3FullAccess` permissions, or at a minimum read/write permissions for the bucket you created above. You'll need the `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY` for this user.

### Google

* Create an Google spreadsheet for the 'executive dashboard'. 
* Create a project in the Google Console and enable Google BigQuery. You'll have to associate this project with an account that has payment information entered, but this project will stay within the [free tier](https://cloud.google.com/bigquery/pricing). Note the project id.
* Using the BigQuery console:
  * Create a [BigQuery dataset](https://cloud.google.com/bigquery/docs/datasets). Suggested name: `default`.
  * Create a [BigQuery table]. Suggested name: `orderdata`. Create the table from a file upload (of the sample sales data) and select 'Auto detect' for the schema, so that the schema gets picked up from the CSV file.
  * Delete all the rows from the newly uploaded table, so we can add them with this app. `delete from \`default.orderdata\` where 1=1` (or just delete some of them: `delete from \`default.orderdata\` where Region='Europe'`)

## Running it


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

