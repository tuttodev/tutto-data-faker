import { Post } from '@domain/entities/post/Post'
import { PostRepository } from '@domain/repositories/PostRepository'

export class PostRepositoryMock implements PostRepository {
  private readonly saveMock: jest.Mock

  constructor () {
    this.saveMock = jest.fn()
  }

  async save (post: Post): Promise<void> {
    this.saveMock(post)
  }

  assertSaveHaveBeenCalledWith (post: Post): void {
    expect(this.saveMock).toHaveBeenCalledWith(post)
  }
}
