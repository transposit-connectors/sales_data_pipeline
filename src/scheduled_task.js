(params) => {
  const bucket = env.get("order_bucket");
  const upload_prefix = "upload";
  const processed_prefix = "processed";
  const files = api.run("this.find_files_to_process", {
    bucket: bucket,
    prefix: upload_prefix
  });

  files.forEach(f => {
    let result = api.run("this.pipeline_top", {
      file_url: 's3://' + bucket + '/' + f.Key
    })[0];

    if (result.success) {
      result = api.run("this.move_processed_files", {
        bucket: bucket,
        key: f.Key,
        upload_prefix: upload_prefix,
        processed_prefix: processed_prefix
      });
      return result;
    }
  });
}