import { PostgresClientFactory } from './PostgresClientFactory'
import { Client as PostgresClient } from 'pg'

export abstract class PostgresRepository {
  private readonly _client: Promise<PostgresClient>

  constructor () {
    this._client = PostgresClientFactory.createClient('postgres', {
      database: process.env.POSTGRES_DATABASE ?? 'postgres',
      host: process.env.POSTGRES_HOST ?? 'localhost',
      password: process.env.POSTGRES_PASSWORD ?? 'postgres',
      port: Number(process.env.POSTGRES_PORT) ?? 5432,
      user: process.env.POSTGRES_USER ?? 'postgres'
    })
  }

  protected abstract tableName (): string

  protected async client (): Promise<PostgresClient> {
    return await this._client
  }
}
