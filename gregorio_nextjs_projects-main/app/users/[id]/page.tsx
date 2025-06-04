import { UserInterface } from "@/types/user-interface";
import { notFound } from "next/navigation";

const users: UserInterface[] = [
  {
    id: "1",
    username: "johndoe",
    password: "********",
    email: "john@example.com",
    displayName: "John Doe",
    profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    roles: ["user"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2025-06-02"),
  },
  {
    id: "2",
    username: "janedoe",
    password: "********",
    email: "jane@example.com",
    displayName: "Jane Doe",
    profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    roles: ["admin"],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2025-06-02"),
  },
];

interface UserProfilePageProps {
  params: { id: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const user = users.find((u) => u.id === params.id);
  if (!user) return notFound();

  return (
    <div className="max-w-lg mx-auto p-8">
      <div className="flex items-center gap-6 mb-8">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={user.displayName || user.username}
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <span className="inline-block w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700" />
        )}
        <div>
          <h2 className="text-2xl font-bold">{user.displayName || user.username}</h2>
          <div className="text-gray-500">@{user.username}</div>
          <div className="text-sm text-gray-400">ID: {user.id}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div><span className="font-semibold">Email:</span> {user.email}</div>
        <div><span className="font-semibold">Roles:</span> {user.roles?.join(", ") || "-"}</div>
        <div><span className="font-semibold">Created At:</span> {user.createdAt?.toLocaleDateString() || "-"}</div>
        <div><span className="font-semibold">Updated At:</span> {user.updatedAt?.toLocaleDateString() || "-"}</div>
      </div>
    </div>
  );
}
