import { Post } from '@domain/entities/post/Post'
import { PostRepository } from '@domain/repositories/PostRepository'

interface Input {
  id: string
  userId: string
  text: string
  createdAt: Date
}

export class PostCreator {
  constructor (private readonly postRepository: PostRepository) {}

  async run (input: Input): Promise<void> {
    const post = Post.create(
      input.id,
      input.userId,
      input.text,
      input.createdAt
    )

    await this.postRepository.save(post)
  }
}
