import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '@modules/User/infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserGetterUseCase } from '@modules/User/application/usecases/UserGetter'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)

  try {
    const users = await userGetterUseCase.run()
    res.json(users)
    return
  } catch (e) {
    return next(e)
  }
}
