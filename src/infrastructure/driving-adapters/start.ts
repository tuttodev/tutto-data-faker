import 'module-alias/register'
import path from 'path'
import * as dotenv from 'dotenv'
import { TuttoDataFakerBackendApp } from './api-rest/TuttoDataFakerBackendApp'
import { TuttoDataFakerGraphQL } from './graphql/TuttoDataFakerGraphQL'
import { Connection as MongoDBConnection } from '@infrastructure/implementations/MongoDB/Connection'

(async () => {
  try {
    dotenv.config({
      path: path.resolve(__dirname, '../../../.env')
    })

    await new MongoDBConnection().connect()

    new TuttoDataFakerBackendApp().start()
    new TuttoDataFakerGraphQL().start()
  } catch (error) {
    console.log(error)
  }
})()
