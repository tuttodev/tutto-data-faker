import { NextFunction, Request, Response } from 'express'
import { UserDeleterUseCase } from '../../../../../application/usecases/UserDeleter'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.id

  const mongoDBRepository = new MongoDBUserRepository()
  const userDeleterUseCase = new UserDeleterUseCase(mongoDBRepository)

  try {
    const userDeleted = await userDeleterUseCase.run(userId)
    res.json(userDeleted)
    return
  } catch (e) {
    return next(e)
  }
}
