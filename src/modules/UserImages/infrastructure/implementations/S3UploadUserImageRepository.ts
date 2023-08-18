import { UserImage } from '../../domain/UserImage'
import { UploadUserImageRepository } from '../../domain/UploadUserImageRepository'
import { S3Repository } from '@moduleShared/infrastructure/aws/S3Repository'

export class S3UploadUserImageRepository extends S3Repository implements UploadUserImageRepository {
  protected bucketSubFolders (): string {
    return 'user-image'
  }

  async upload (userImage: UserImage, file: Buffer): Promise<void> {
    await this.s3Upload({
      file: file,
      fileName: userImage.generateFileNameWithExtension()
    })
  }
}
