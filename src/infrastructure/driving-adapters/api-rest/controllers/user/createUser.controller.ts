import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserCreatorUseCase } from '../../../../../application/usecases/UserCreator'
import { UuidV4Generator } from '@infrastructure/UuidV4Generator'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username,
    age,
    name
  } = req.body

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
    res.json(userCreated)
    return
  } catch (e) {
    return next(e)
  }
}
