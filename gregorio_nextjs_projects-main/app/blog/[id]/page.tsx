import { BlogPost } from "@/types/blog-post";
import { notFound } from "next/navigation";

// This will be replaced by API fetch in a real app
const posts: BlogPost[] = [
  {
    id: "1",
    title: "Welcome to the Blog!",
    content: "This is the first post. Edit or add more posts to get started.",
    authorId: "1",
    createdAt: "2025-06-02T00:00:00.000Z",
    updatedAt: "2025-06-02T00:00:00.000Z",
    tags: ["welcome", "intro"],
    coverImageUrl: "",
  },
];

interface BlogDetailPageProps {
  params: { id: string };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = posts.find((p) => p.id === params.id);
  if (!post) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 text-sm mb-2">{new Date(post.createdAt).toLocaleString()}</div>
      {post.tags && post.tags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-gray-200 text-xs px-2 py-1 rounded">{tag}</span>
          ))}
        </div>
      )}
      {post.coverImageUrl && (
        <img src={post.coverImageUrl} alt="cover" className="mb-4 rounded w-full max-h-64 object-cover" />
      )}
      <div className="mt-4 whitespace-pre-line text-lg text-gray-800">{post.content}</div>
    </div>
  );
}
