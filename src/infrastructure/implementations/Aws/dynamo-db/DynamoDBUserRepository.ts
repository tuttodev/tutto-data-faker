import { User } from '@domain/entities/user/User'
import { UserAge, UserId, UserName, UserUserName } from '@domain/entities/user/valueObjects'
import { UserRepository } from 'domain/repositories/UserRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBUserRepository implements UserRepository {
  private readonly _db = DynamoDB.getInstance()

  async getAll (): Promise<User[]> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'ENTITY_TYPE = :entity',
      ExpressionAttributeValues: {
        ':entity': {
          S: 'USER'
        }
      }
    }).promise()

    const items = (response.Items != null) ? response.Items : []

    const users = items.map((item: any) => {
      const age: string = item.age.N ?? ''
      const id: string = item['TUTTO-DATA-FAKER_PK'].S ?? ''
      const name: string = item.name.S ?? ''
      const username: string = item.username.S ?? ''

      return {
        age: new UserAge(Number(age)),
        id: new UserId(id.split('_')[1]),
        name: new UserName(name),
        username: new UserUserName(username)
      }
    })

    return users
  }

  async save (user: User): Promise<User> {
    await this._db.putItem({
      TableName: DynamoDB.TABLE_NAME,
      Item: {
        'TUTTO-DATA-FAKER_PK': {
          S: `USER_${user.id._value}`
        },
        'TUTTO-DATA-FAKER_SK': {
          S: `USER_${user.id._value}`
        },
        ENTITY_TYPE: {
          S: 'USER'
        },
        username: {
          S: user.username._value
        },
        name: {
          S: user.name._value
        },
        age: {
          N: `${user.age?._value ?? ''}`
        }
      }
    }).promise()

    return user
  }

  async getByUserName (username: string): Promise<User | null> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': {
          S: username
        }
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const age: string = item.age.N ?? ''
    const id: string = item['TUTTO-DATA-FAKER_PK'].S ?? ''
    const name: string = item.name.S ?? ''
    const usernameItem: string = item.username.S ?? ''

    const user: User = {
      age: new UserAge(Number(age)),
      id: new UserId(id.split('_')[1]),
      name: new UserName(name),
      username: new UserUserName(usernameItem)
    }

    return user
  }

  async update (user: User): Promise<User> {
    await this._db.updateItem({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        'TUTTO-DATA-FAKER_PK': {
          S: `USER_${user.id._value}`
        },
        'TUTTO-DATA-FAKER_SK': {
          S: `USER_${user.id._value}`
        }
      },
      UpdateExpression: 'set #username = :username, #name = :name, #age = :age',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#username': 'username',
        '#age': 'age'
      },
      ExpressionAttributeValues: {
        ':username': {
          S: user.username._value
        },
        ':name': {
          S: user.name._value
        },
        ':age': {
          N: `${user.age?._value ?? ''}`
        }
      }
    }).promise()

    return user
  }

  async delete (user: User): Promise<void> {
    await this._db.deleteItem({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        'TUTTO-DATA-FAKER_PK': {
          S: `USER_${user.id._value}`
        },
        'TUTTO-DATA-FAKER_SK': {
          S: `USER_${user.id._value}`
        }
      }
    }).promise()
  }

  async getById (id: string): Promise<User | null> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'TUTTO-DATA-FAKER_PK'
      },
      ExpressionAttributeValues: {
        ':pk': {
          S: `USER_${id}`
        }
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const age: string = item.age.N ?? ''
    const idItem: string = item['TUTTO-DATA-FAKER_PK'].S ?? ''
    const name: string = item.name.S ?? ''
    const usernameItem: string = item.username.S ?? ''

    const user: User = {
      age: new UserAge(Number(age)),
      id: new UserId(idItem.split('_')[1]),
      name: new UserName(name),
      username: new UserUserName(usernameItem)
    }

    return user
  }
}
