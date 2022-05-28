import { DynamoDBUserRepository } from '@infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserCreatorUseCase } from '@application/usecases/UserCreator'
import { UuidV4Generator } from '@infrastructure/UuidV4Generator'
import { HandlerError } from '../../utils/HandlerError'

const userMutations = {
  createUser: async (_: any, args: any) => {
    const {
      user: {
        username,
        age,
        name
      }
    } = args

    const dynamoDBUserRepo = new DynamoDBUserRepository()
    const uuidGenerator = new UuidV4Generator()
    const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo, uuidGenerator)

    try {
      const userCreated = await userCreatorUseCase.run({
        name,
        username,
        age
      })

      return userCreated
    } catch (error) {
      return HandlerError.run(error)
    }
  }
}

export default userMutations
