import { Router } from 'express'

import {
  uploadUserImageController
} from '../controllers/index'
import { Multer } from '../Multer'

const route = Router()

route.post('', Multer.multer.single('image'), uploadUserImageController)

export default route
