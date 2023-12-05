import path from 'path'
import * as dotenv from 'dotenv'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { DynamoDBUserRepository } from '../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'
import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater'
import { UserDeleterUseCase } from '../../../application/usecases/UserDeleter'
import { UuidV4Generator } from '@infrastructure/UuidV4Generator'
(async () => {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const uuidV4Generator = new UuidV4Generator()

  // Creando usuarios
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo, uuidV4Generator)
  await userCreatorUseCase.run({
    name: 'Luciana',
    age: 12,
    username: 'luciana24'
  })

  // Obteniendo usuarios
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)
  const usersReturned = await userGetterUseCase.run()
  console.log(usersReturned)

  // Actualizar usuarios
  const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo)

  await userUpdaterUseCase.run({
    id: '1',
    username: 'luci',
    age: undefined,
    name: undefined
  })

  const usersReturned2 = await userGetterUseCase.run()
  console.log(usersReturned2)

  // Eliminar un usuario
  const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepo)
  await userDeleterUseCase.run('1')

  const usersReturned3 = await userGetterUseCase.run()
  console.log(usersReturned3)
})()
