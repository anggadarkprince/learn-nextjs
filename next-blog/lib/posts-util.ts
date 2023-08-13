import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import {Post} from "@/types/Post";

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostData(postIdentifier: string): Promise<Post> {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const {data, content} = matter(fileContent);
  return {
    slug: postSlug,
    title: data.title,
    date: data.date,
    author: data.author,
    image: data.image,
    excerpt: data.excerpt,
    isFeatured: data.isFeatured,
    content: content,
  };
}

export async function getPostsFiles() {
  return await fs.readdir(postsDirectory);
}

export async function getAllPosts() {
  const postFiles = await getPostsFiles();
  const allPosts = await Promise.all(postFiles.map(async postFile => {
    return await getPostData(postFile);
  }));
  return allPosts.sort((postA: any, postB: any) => {
    return postA.date > postB.date ? -1 : 1;
  });
}

export async function getFeaturedPosts() {
  const allPosts = await getAllPosts();
  return allPosts.filter((post: any) => post.isFeatured);
}
