import { EntityRoot } from '../EntityRoot'
import { UserImageIsProfile } from './UserImageIsProfile'
import { UserId } from '../user/valueObjects'
import { UserImageId } from './UserId'
import { UserImageFileName } from './UserImageFileName'
import { UserImageFileExtension } from './UserImageFileExtension'
import { UserImageFileMimeType } from './UserImageFileMimeType'

interface PrimitiveData {
  id: string
  userId: string
  isProfile: Boolean
  fileName: string
  fileExtension: string
  fileMimeType: string
}

export class UserImage extends EntityRoot<UserImage, PrimitiveData> {
  private readonly _id: UserImageId
  private readonly _isProfile: UserImageIsProfile
  private readonly _userId: UserId
  private readonly _fileName: UserImageFileName
  private readonly _fileExtension: UserImageFileExtension
  private readonly _fileMimeType: UserImageFileMimeType

  constructor ({
    id,
    isProfile,
    userId,
    fileExtension,
    fileMimeType
  }: { id: UserImageId, isProfile: UserImageIsProfile, userId: UserId, fileExtension: UserImageFileExtension, fileMimeType: UserImageFileMimeType }) {
    super()
    this._id = id
    this._isProfile = isProfile
    this._userId = userId
    this._fileExtension = fileExtension
    this._fileMimeType = fileMimeType
    this._fileName = new UserImageFileName(this.generateFileName())
  }

  get id (): string {
    return this._id.value
  }

  get isProfile (): boolean {
    return this._isProfile.value
  }

  get userId (): string {
    return this._userId.value
  }

  get fileName (): string {
    return this._fileName.value
  }

  get fileExtension (): string {
    return this._fileExtension.value
  }

  get imageMimeType (): string {
    return this._fileMimeType.value
  }

  static create (data: {
    id: UserImageId
    isProfile: UserImageIsProfile
    userId: UserId
    fileExtension: UserImageFileExtension
    fileMimeType: UserImageFileMimeType }): UserImage {
    const user = new UserImage(data)

    return user
  }

  static fromPrimitives (plainData: { id: string, url: string, isProfile: boolean, userId: string, fileExtension: string, fileMimeType: string }): UserImage {
    return new UserImage({
      id: new UserImageId(plainData.id),
      isProfile: new UserImageIsProfile(plainData.isProfile),
      userId: new UserId(plainData.userId),
      fileExtension: new UserImageFileExtension(plainData.fileExtension),
      fileMimeType: new UserImageFileMimeType(plainData.fileMimeType)
    })
  }

  toPrimitives (): PrimitiveData {
    return {
      id: this.id,
      isProfile: this.isProfile,
      userId: this.userId,
      fileName: this.fileName,
      fileExtension: this.fileExtension,
      fileMimeType: this.imageMimeType
    }
  }

  generateFileName (): string {
    return `${this.userId}_${this.id}`
  }

  generateFileNameWithExtension (): string {
    return `${this.fileName}.${this.fileExtension}`
  }

  isProfileImage (): boolean {
    return this.isProfile
  }
}
