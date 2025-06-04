"use client";

import { useEffect, useState } from "react";
import { UserApiType } from "@/app/api/users/route";

export default function UsersPage() {
  const [users, setUsers] = useState<UserApiType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError("Could not load users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <div className="p-8">Loading users...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left">Avatar</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Display Name</th>
            <th className="px-4 py-2 text-left">Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.displayName || user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="inline-block w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
                )}
              </td>
              <td className="px-4 py-2 font-mono">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.displayName || "-"}</td>
              <td className="px-4 py-2">{user.roles?.join(", ") || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
