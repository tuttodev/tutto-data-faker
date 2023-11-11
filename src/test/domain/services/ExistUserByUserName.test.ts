
import { ExistUserByUserName } from '@domain/services/ExistUserByUserName'
import { UserRepositoryMock } from '@test/mocks/UserRepositoryMock'
import { UserMother } from '@test/mocks/object-mother/UserMother/UserMother'

describe('ExistUserByUserName', () => {
  test('should find a user', async () => {
    const user = UserMother.random()

    const repository = new UserRepositoryMock()
    repository.returnOnGetByUserName(user)

    const useCase = new ExistUserByUserName(repository)
    const userWasFound = await useCase.run(user.name._value)

    expect(userWasFound).toEqual(true)
  })

  test('should not find a user', async () => {
    const repository = new UserRepositoryMock()
    repository.returnOnGetByUserName(null)

    const useCase = new ExistUserByUserName(repository)
    const userWasFound = await useCase.run('not_found')

    expect(userWasFound).toEqual(false)
  })
})
