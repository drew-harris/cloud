export AWS_ACCESS_KEY_ID=drew
export AWS_SECRET_ACCESS_KEY=drewdrew
export AWS_DEFAULT_REGION=us-west-2

pulumi login 's3://pulumi-data?endpoint=minio.drewh.net&disableSSL=true&s3ForcePathStyle=true'
