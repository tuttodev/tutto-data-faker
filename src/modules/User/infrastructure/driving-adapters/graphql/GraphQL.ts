import express from 'express'
import * as http from 'http'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'

export class GraphQL {
  private readonly _port: string
  private readonly _app: express.Express
  private readonly _httpServer?: http.Server
  private readonly _apolloServer: ApolloServer

  constructor (port: string) {
    this._port = port
    this._app = express()
    this._httpServer = http.createServer(this._app)
    this._apolloServer = new ApolloServer({
      schema,
      csrfPrevention: true
    })
  }

  async listen (): Promise<void> {
    await this._apolloServer.start()

    this._apolloServer.applyMiddleware({
      app: this._app,
      path: '/tutto-data-faker-graphql'
    })

    return await new Promise(resolve => {
      this._httpServer?.listen(this._port, () => {
        console.log(
          `GraphQL App is running at http://localhost:${this._port}${this._apolloServer.graphqlPath}`
        )
        console.log('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  async stop (): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this._httpServer != null) {
        this._httpServer.close(error => {
          if (error != null) {
            return reject(error)
          }
          return resolve()
        })
      }

      return resolve()
    })
  }
}
