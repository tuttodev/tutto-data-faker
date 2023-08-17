import { User } from '../../../../domain/User'
import { Nullable } from '@moduleShared/domain/Nullable'
import { UserRepository } from '../../../../domain/UserRepository'
import { DynamoDB } from '@moduleShared/infrastructure/aws/dynamoDB'

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

      return User.fromPrimitives({
        id: id.split('_')[1],
        name,
        username,
        age: Number(age)
      })
    })

    return users
  }

  async save (user: User): Promise<User> {
    await this._db.putItem({
      TableName: DynamoDB.TABLE_NAME,
      Item: {
        'TUTTO-DATA-FAKER_PK': {
          S: `USER_${user.id.value}`
        },
        'TUTTO-DATA-FAKER_SK': {
          S: `USER_${user.id.value}`
        },
        ENTITY_TYPE: {
          S: 'USER'
        },
        username: {
          S: user.username.value
        },
        name: {
          S: user.name.value
        },
        age: {
          N: `${user.age?.value ?? ''}`
        }
      }
    }).promise()

    return user
  }

  async getByUserName (username: string): Promise<Nullable<User>> {
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

    return User.fromPrimitives({
      id: id.split('_')[1],
      name,
      username: usernameItem,
      age: Number(age)
    })
  }

  async update (user: User): Promise<User> {
    await this._db.updateItem({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        'TUTTO-DATA-FAKER_PK': {
          S: `USER_${user.id.value}`
        },
        'TUTTO-DATA-FAKER_SK': {
          S: `USER_${user.id.value}`
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
          S: user.username.value
        },
        ':name': {
          S: user.name.value
        },
        ':age': {
          N: `${user.age?.value ?? ''}`
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
          S: `USER_${user.id.value}`
        },
        'TUTTO-DATA-FAKER_SK': {
          S: `USER_${user.id.value}`
        }
      }
    }).promise()
  }

  async getById (id: string): Promise<Nullable<User>> {
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

    return User.fromPrimitives({
      id: idItem.split('_')[1],
      name,
      username: usernameItem,
      age: Number(age)
    })
  }
}
