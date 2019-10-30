(params) => {
  const bucket = params.bucket;
  const key = params.key;
  const dest_key = key.replace(params.upload_prefix, params.processed_prefix);

  const src = bucket + "/" + key;
  let success = true;
  try {
    api.query("SELECT * FROM aws_s3.copy_object WHERE Bucket = '" +
      bucket + "' AND Key = '" +
      dest_key + "' AND x-amz-copy-source= '" + src + "'");
    api.query("SELECT * FROM aws_s3.delete_object  WHERE Bucket = '" +
      bucket + "' AND Key = '" + key + "'");
  } catch (e) {
    console.log(e);
    success = false;
  }
  return {
    success: success
  }
}