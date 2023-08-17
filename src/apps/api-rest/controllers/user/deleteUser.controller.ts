import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '@modules/User/infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserDeleterUseCase } from '@modules/User/application/usecases/UserDeleter'

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.id

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepo)

  try {
    const userDeleted = await userDeleterUseCase.run(userId)
    res.json(userDeleted)
    return
  } catch (e) {
    return next(e)
  }
}
