export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string; // ISO string for consistency with API
  updatedAt: string; // ISO string for consistency with API
  tags?: string[];
  coverImageUrl?: string;
}
