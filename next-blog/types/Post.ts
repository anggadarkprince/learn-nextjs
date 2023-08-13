export type Post = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  image: string;
  excerpt?: string;
  isFeatured?: boolean;
  content: string;
}
