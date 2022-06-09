import { NextFunction, Request, Response } from 'express'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'
import { UserGetterUseCase } from '../../../../../application/usecases/UserGetter'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const mongoDBRepository = new MongoDBUserRepository()
  const userGetterUseCase = new UserGetterUseCase(mongoDBRepository)

  try {
    const users = await userGetterUseCase.run()
    res.json(users)
    return
  } catch (e) {
    return next(e)
  }
}
