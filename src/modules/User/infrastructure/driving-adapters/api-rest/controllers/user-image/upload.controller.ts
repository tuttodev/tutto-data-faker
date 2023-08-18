import { UploadUserImage } from '@application/usecases/UploadUserImage'
import { UuidV4Generator } from '@infrastructure/UuidV4Generator'
import { PostgreUserImageRepository } from '@infrastructure/implementations/PostgreUserImageRepository'
import { S3UploadUserImageRepository } from '@infrastructure/implementations/S3UploadUserImageRepository'
import { NextFunction, Request, Response } from 'express'

export const uploadUserImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const multerFile = req.file
  const body = req.body

  try {
    if (!multerFile) throw new Error('File not found')

    const input = {
      id: new UuidV4Generator().generate(),
      userId: body.userId,
      image: multerFile.buffer,
      imageMimeType: multerFile.mimetype,
      imageExt: multerFile.originalname.split('.').pop() ?? '',
      imageName: multerFile.originalname.split('.').shift() ?? '',
      isProfile: body.isProfile === 'true'
    }

    const uploadUserImage = new UploadUserImage(
      new S3UploadUserImageRepository(),
      new PostgreUserImageRepository()
    )

    await uploadUserImage.execute(input)

    res.status(201).end()
  } catch (e) {
    return next(e)
  }
}
