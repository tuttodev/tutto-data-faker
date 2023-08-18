import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export abstract class S3Repository {
  private readonly _client: S3Client

  constructor () {
    this._client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
      }
    })
  }

  protected abstract bucketSubFolders (): string

  protected client (): S3Client {
    return this._client
  }

  async s3Upload (uploadData: { file: Buffer, fileName: string }): Promise<void> {
    const client = this.client()

    const params = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME ?? 'tutto-data-faker',
      Key: `${this.bucketSubFolders()}/${uploadData.fileName}`,
      Body: uploadData.file
    })

    await client.send(params)
  }
}