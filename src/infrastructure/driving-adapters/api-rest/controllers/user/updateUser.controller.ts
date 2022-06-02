import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserUpdaterUseCase } from '../../../../../application/usecases/UserUpdater'

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
    const user = await userUpdaterUseCase.run({
      age,
      id: userId,
      name,
      username
    })

    res.json(user)
    return
  } catch (e) {
    return next(e)
  }
}
