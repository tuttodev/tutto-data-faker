import { Post } from '@domain/entities/post/Post'

export class PostRepository {
  save: (post: Post) => Promise<void>
}
