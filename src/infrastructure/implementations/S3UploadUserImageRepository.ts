import { UserImage } from '@domain/entities/user-image/UserImage'
import { UploadUserImageRepository } from '@domain/repositories/UploadUserImageRepository'
import { S3Repository } from '@shared/infrastructure/persistence/aws/S3Repository'

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
