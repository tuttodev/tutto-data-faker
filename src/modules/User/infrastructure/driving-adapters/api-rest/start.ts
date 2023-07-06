import path from 'path'
import * as dotenv from 'dotenv'
import { TuttoDataFakerBackendApp } from './TuttoDataFakerBackendApp'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  new TuttoDataFakerBackendApp().start()
} catch (error) {
  console.log(error)
}
