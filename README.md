# Sales Data Pipeline
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

### Transposit 

Create a [free Transposit account](https://console.transposit.com/).

## Running it

* Fork the app [https://console.transposit.com/t/transposit-sample/sales_data_pipeline](https://console.transposit.com/t/transposit-sample/sales_data_pipeline) (find the Fork button at the top of the editor view).
* Navigate to **Code** and review the operations. You may want to look closely at the `scheduled_task` operation, which contains the S3 manipulations, the `pipeline_top` operation which documents the pipeline, and the `add_sales_rep` operation, which adds in some sales data. 
* While you are looking at the operations, increase the `Custom timeout` to `300000` (5 minutes) for the `scheduled_task` operation by going to the Properties tab.
* Navigate to **Deploy > Production Keys** and add keys for all the data connectors.
* Navigate to **Deploy > Environment Variables** and fill out environment variables based on the external resources you created above.
* Navigate to **Deploy > Scheduled Tasks** and create a new scheduled task. Run the `scheduled_task` operation every 10 minutes: `37 /10 * ? * *`

You can also run the pipeline by clicking "Run now & show log". You should then see records start to appear in the BigQuery table.

## Go further

* Take action when the inventory levels are too low (send an [email with SendGrid](/docs/references/connectors/sendgrid-documentation/) or [post to Slack](/docs/references/connectors/slack-documentation/))
* Push the logic for adding the sales rep to [a lambda](/blog/2019.10.07-basics-of-lambda/) and call that instead of adding the data in a Transposit operation.
* Add the top sales rep to the executive dashboard spreadsheet.
* Fork the application again and set up a test environment with different external resources. Write an operation that samples the datawarehouse with a known S3 input to make sure that the pipeline operates correctly.
