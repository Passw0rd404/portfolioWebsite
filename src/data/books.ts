export interface BookMeta {
  slug: string;
  title: string;
  author: string;
  summary: string;
  date: string;
  cover?: string;
  tags: string[];
  rating?: number;
  published: boolean;
  readTime: string;
}
