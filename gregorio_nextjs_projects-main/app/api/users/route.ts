import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { UserInterface } from "@/types/user-interface";

export type UserApiType = Omit<UserInterface, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

let users: UserApiType[] = [
	{
		id: "1",
		username: "johndoe",
		password: "********",
		email: "john@example.com",
		displayName: "John Doe",
		profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
		roles: ["user"],
		createdAt: "2024-01-01T00:00:00.000Z",
		updatedAt: "2025-06-02T00:00:00.000Z",
	},
	{
		id: "2",
		username: "janedoe",
		password: "********",
		email: "jane@example.com",
		displayName: "Jane Doe",
		profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
		roles: ["admin"],
		createdAt: "2024-02-01T00:00:00.000Z",
		updatedAt: "2025-06-02T00:00:00.000Z",
	},
];

export const dynamic = "force-dynamic";

export async function GET(): Promise<ReturnType<typeof NextResponse.json<UserApiType[]>>> {
	return NextResponse.json<UserApiType[]>(users);
}

export async function POST(request: NextRequest): Promise<ReturnType<typeof NextResponse.json<{ message: string; user: UserApiType }> | typeof NextResponse.json<{ error: string }>>> {
  try {
    const newUserRequestData = await request.json() as Omit<UserInterface, "id" | "createdAt" | "updatedAt">;

    if (!newUserRequestData.username || !newUserRequestData.email || !newUserRequestData.password) {
      return NextResponse.json({ error: "Missing required fields: username, email, and password are required." }, { status: 400 });
    }
    if (newUserRequestData.username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters." }, { status: 400 });
    }
    if (newUserRequestData.password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(newUserRequestData.email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const newUser: UserApiType = {
      ...newUserRequestData,
      id: (users.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser); // Add to our in-memory list
    console.log("New user added:", newUser);
    console.log("Current users in API memory:", users);

    return NextResponse.json<{ message: string; user: UserApiType }>({ message: "User added successfully", user: newUser }, { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return NextResponse.json<{ error: string }>({ error: "Failed to create user. Please check server logs." }, { status: 500 });
  }
}