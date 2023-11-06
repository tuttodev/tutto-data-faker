import 'dotenv/config'
import { TuttoDataFakerBackendApp } from './TuttoDataFakerBackendApp'

try {
  console.log(process.env.AWS_ACCESS_KEY_ID)
  new TuttoDataFakerBackendApp().start()
} catch (error) {
  console.log(error)
}
