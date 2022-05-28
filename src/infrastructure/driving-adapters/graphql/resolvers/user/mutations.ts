import { UserCreatorUseCase } from '@application/usecases/UserCreator'
import { DynamoDBUserRepository } from '@infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository'
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
        const uuidV4Generator = new UuidV4Generator()
        const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo, uuidV4Generator)
        
        const userToCreate = {
            name,
            username,
            age
        }
        
        try {
            const userCreated = await userCreatorUseCase.run(userToCreate)
            return userCreated
        } catch (error) {
            return HandlerError.run(error)
        }
    }
}

export default userMutations