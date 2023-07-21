import multer from 'multer'

export class Multer {
  private static readonly _multer: multer.Multer = multer({
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
  })

  static get multer (): multer.Multer {
    return this._multer
  }
}
