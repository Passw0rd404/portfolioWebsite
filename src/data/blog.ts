export interface BlogPostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  cover?: string;
  tags: string[];
  published: boolean;
  readTime: string;
}
