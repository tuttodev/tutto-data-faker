import { UserImage } from '../../domain/UserImage'
import { UserImageRepository } from '../../domain/UserImageRepository'
import { PostgresRepository } from '@moduleShared/infrastructure/persistence/postgres/PostgresRepository'
import { QueryConfig } from 'pg'

export class PostgreUserImageRepository extends PostgresRepository implements UserImageRepository {
  protected tableName (): string {
    return 'user_image'
  }

  async save (userImage: UserImage): Promise<void> {
    const postgresClient = await this.client()

    const query: QueryConfig = {
      text: `INSERT INTO ${this.tableName()} (id, user_id, image_name, is_profile, image_ext, image_mime_type) VALUES($1, $2, $3, $4, $5, $6)`,
      values: [
        userImage.id,
        userImage.userId,
        userImage.generateFileNameWithExtension(),
        userImage.isProfile,
        userImage.fileExtension,
        userImage.imageMimeType
      ]
    }

    await postgresClient.query(query)
  }
}
