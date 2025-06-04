import { NextRequest, NextResponse } from "next/server";
import { BlogPost } from "@/types/blog-post";

export type BlogPostApiType = BlogPost;

let posts: BlogPostApiType[] = [
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

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as Omit<BlogPost, "id" | "createdAt" | "updatedAt">;
    if (!data.title || data.title.length < 3) {
      return NextResponse.json({ error: "Title must be at least 3 characters." }, { status: 400 });
    }
    if (!data.content || data.content.length < 10) {
      return NextResponse.json({ error: "Content must be at least 10 characters." }, { status: 400 });
    }
    if (!data.authorId) {
      return NextResponse.json({ error: "Author ID is required." }, { status: 400 });
    }
    const newPost: BlogPostApiType = {
      ...data,
      id: (posts.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);
    return NextResponse.json({ message: "Blog post added successfully", post: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post. Please check server logs." }, { status: 500 });
  }
}
