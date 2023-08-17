import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '@modules/User/infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserUpdaterUseCase } from '@modules/User/application/usecases/UserUpdater'

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    name,
    username,
    age
  } = req.body

  const userId = req.params.userId

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo)

  try {
    const userToUpdate = {
      age,
      id: userId,
      name,
      username
    }

    const user = await userUpdaterUseCase.run(userToUpdate)
    res.json(user)
    return
  } catch (e) {
    return next(e)
  }
}
