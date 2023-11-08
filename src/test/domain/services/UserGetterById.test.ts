import { UserGetterById } from '@domain/services/UserGetterById/index'
import { UserRepositoryMock } from '@test/mocks/UserRepositoryMock'
import { UserMother } from '@test/mocks/object-mother/UserMother/UserMother'

describe('UserGetterById', () => {
  test('should return a user', async () => {
    const user = UserMother.random()

    const repository = new UserRepositoryMock()
    repository.returnOnGetById(user)

    const useCase = new UserGetterById(repository)
    const userFound = await useCase.run(user.id.value)

    expect(userFound).toEqual(user)
  })

  test('should throw an exception when user is not found', async () => {
    const repository = new UserRepositoryMock()
    repository.returnOnGetById(null)

    const useCase = new UserGetterById(repository)

    await expect(async () => await useCase.run('id')).rejects.toThrow()
  })
})
