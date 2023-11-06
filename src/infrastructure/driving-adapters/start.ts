import 'module-alias/register'
import 'dotenv/config'
import { TuttoDataFakerBackendApp } from './api-rest/TuttoDataFakerBackendApp'
import { TuttoDataFakerGraphQL } from './graphql/TuttoDataFakerGraphQL'

try {
  new TuttoDataFakerBackendApp().start()
  new TuttoDataFakerGraphQL().start()
} catch (error) {
  console.log(error)
}
