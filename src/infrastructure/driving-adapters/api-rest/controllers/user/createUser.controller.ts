import { NextFunction, Request, Response } from 'express'
import { MongoDBUserRepository } from '../../../../implementations/MongoDB/MongoDBUserRepository'
import { UserCreatorUseCase } from '@application/usecases/UserCreator'
import { UuidV4Generator } from '@infrastructure/UuidV4Generator'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username,
    age,
    name
  } = req.body

  const mongoDBRepository = new MongoDBUserRepository()
  const uuidV4Generator = new UuidV4Generator()
  const userCreatorUseCase = new UserCreatorUseCase(mongoDBRepository, uuidV4Generator)

  try {
    const userCreated = await userCreatorUseCase.run({
      name,
      username,
      age
    })

    res.json(userCreated)
    return
  } catch (e) {
    return next(e)
  }
}
