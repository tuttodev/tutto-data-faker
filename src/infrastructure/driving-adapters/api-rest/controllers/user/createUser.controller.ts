import { v4 as uuidv4 } from 'uuid'
import { NextFunction, Request, Response } from 'express'
import { User } from 'domain/entities/User'
import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserCreatorUseCase } from '../../../../../application/usecases/UserCreator'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username,
    age,
    name
  } = req.body

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo)

  const userToCreate: User = {
    id: uuidv4(),
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
