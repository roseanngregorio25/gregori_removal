"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog-post";
import { UserApiType } from "@/app/api/users/route";

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<UserApiType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch("/api/blog"),
          fetch("/api/users"),
        ]);
        if (!postsRes.ok) throw new Error("Failed to fetch blog posts");
        if (!usersRes.ok) throw new Error("Failed to fetch users");
        const postsData = await postsRes.json();
        const usersData = await usersRes.json();
        setPosts(postsData);
        setUsers(usersData);
      } catch (err) {
        setError("Could not load blog posts or users");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getAuthorName = (authorId: string) => {
    const user = users.find((u) => u.id === authorId);
    return user ? user.displayName || user.username : "Unknown";
  };

  if (loading) return <div className="p-8">Loading blog posts...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Link
          href="/blog/add"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition-colors"
        >
          Add Post
        </Link>
      </div>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col sm:flex-row overflow-hidden">
            <div className="sm:w-48 flex-shrink-0 h-40 sm:h-auto bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <img
                src={post.coverImageUrl || "/file.svg"}
                alt="Thumbnail"
                className="object-cover w-full h-full"
                style={{ maxHeight: "160px" }}
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-xl font-bold hover:underline"
                >
                  {post.title}
                </Link>
                <div className="text-gray-500 text-sm mt-1">
                  {getAuthorName(post.authorId)} &middot;{" "}
                  {new Date(post.createdAt).toLocaleString()}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-200 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-2 text-gray-700 dark:text-gray-200 line-clamp-2">
                  {post.content.slice(0, 120)}
                  {post.content.length > 120 ? "..." : ""}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
