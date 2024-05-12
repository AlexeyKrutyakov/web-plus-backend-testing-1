import { Injectable } from '@nestjs/common';

export interface Post {
  id: string;
  text: string;
  date: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private lastPostId = 1;

  create(post: Omit<Post, 'id' | 'date'>) {
    const postWithIdAndDate: Post = {
      ...post,
      id: this.lastPostId.toString(),
      date: new Date().toISOString(),
    };

    this.lastPostId++;

    this.posts.push(postWithIdAndDate);

    return postWithIdAndDate;
  }

  find(postId: string) {
    const post = this.posts.find(({ id }) => id === postId);
    if (post) {
      return post;
    } else {
      throw new Error(`Post with id=${postId} not exists`);
    }
  }
}
