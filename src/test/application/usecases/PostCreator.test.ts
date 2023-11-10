import { PostCreator } from '@application/usecases/PostCreator/PostCreator'
import { PostRepositoryMock } from '@test/mocks/PostRepositoryMock'
import { PostMother } from '@test/mocks/object-mother/PostMother/PostMother'

describe('PostCreator', () => {
  test('saving a post without any errors', async () => {
    const post = PostMother.create()
    const repository = new PostRepositoryMock()

    const usecase = new PostCreator(repository)

    await usecase.run({
      id: post.id.value,
      text: post.content.text.value,
      userId: post.userId.value,
      createdAt: post.createdAt.value
    })

    repository.assertSaveHaveBeenCalledWith(post)
  })

  test('should throw error because the text length text is more than 50 characteres', async () => {
    const wrongText = 'bad text content'.repeat(51)

    await expect(async () => {
      const post = PostMother.create()
      const repository = new PostRepositoryMock()

      const usecase = new PostCreator(repository)

      await usecase.run({
        id: post.id.value,
        text: wrongText,
        userId: post.userId.value,
        createdAt: post.createdAt.value
      })
    }).rejects.toThrow(`<${wrongText}> has more than 50 characters`)
  })
})
