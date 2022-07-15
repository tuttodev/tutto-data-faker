import { Connection, Model } from 'mongoose'

export abstract class MongooseRepository<T> {
  constructor (private readonly _client: Promise<Connection>) {}

  protected abstract entitySchema (): Model<T>

  protected async client (): Promise<Connection> {
    return await this._client
  }

  protected async repository (): Promise<Repository<T>> {
    return (await this._client).createCollection
  }

  protected async persist (aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    await repository.save(aggregateRoot as any)
  }
}
