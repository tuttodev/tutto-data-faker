import 'module-alias/register'
import 'dotenv/config'
import { TuttoDataFakerBackendApp } from './TuttoDataFakerBackendApp'

try {
  new TuttoDataFakerBackendApp().start()
} catch (error) {
  console.log(error)
}
