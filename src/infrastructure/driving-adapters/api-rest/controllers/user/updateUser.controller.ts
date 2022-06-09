import { NextFunction, Request, Response } from 'express'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'
import { UserUpdaterUseCase } from '../../../../../application/usecases/UserUpdater'
import { User } from 'domain/entities/User'

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    name,
    username,
    age
  } = req.body

  const userId = req.params.userId

  const mongoDBRepository = new MongoDBUserRepository()
  const userUpdaterUseCase = new UserUpdaterUseCase(mongoDBRepository)

  try {
    const userToUpdate: User = {
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
