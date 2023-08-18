import { Client as PostgresClient } from 'pg'
import { PostgresConfig } from './PostgresConfig'

export class PostgresClientFactory {
  private static readonly clients: { [key: string]: PostgresClient } = {}

  static async createClient (contextName: string, config: PostgresConfig): Promise<PostgresClient> {
    let client = PostgresClientFactory.getClient(contextName)

    if (!client) {
      client = await PostgresClientFactory.createAndConnectClient(config)

      PostgresClientFactory.registerClient(client, contextName)
    }

    return client
  }

  private static getClient (contextName: string): PostgresClient | null {
    return PostgresClientFactory.clients[contextName]
  }

  private static async createAndConnectClient (config: PostgresConfig): Promise<PostgresClient> {
    const client = new PostgresClient(config)

    await client.connect()

    return client
  }

  private static registerClient (client: PostgresClient, contextName: string): void {
    PostgresClientFactory.clients[contextName] = client
  }
}
