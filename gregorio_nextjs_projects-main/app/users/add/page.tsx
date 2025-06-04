"use client";

import { useState } from "react";
import { UserInterface } from "@/types/user-interface";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const router = useRouter();
  const [form, setForm] = useState<Omit<UserInterface, "id" | "createdAt" | "updatedAt">>({
    username: "",
    password: "",
    email: "",
    displayName: "",
    profileImageUrl: "",
    roles: [],
  });
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<Partial<Record<keyof typeof form, boolean>>>({});

  const handleChange = <K extends keyof typeof form>(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, roles: e.target.value.split(",").map((r) => r.trim()) }));
    setTouched((prev) => ({ ...prev, roles: true }));
  };

  const getFieldError = (field: keyof typeof form): string | null => {
    if (!touched[field]) return null;
    if (field === "username" && (!form.username || form.username.length < 3)) {
      return "Username must be at least 3 characters.";
    }
    if (field === "password" && (!form.password || form.password.length < 6)) {
      return "Password must be at least 6 characters.";
    }
    if (
      field === "email" &&
      (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
    ) {
      return "A valid email is required.";
    }
    return null;
  };

  const validate = (data: typeof form) => {
    if (!data.username || data.username.length < 3) {
      return "Username is required and must be at least 3 characters.";
    }
    if (!data.password || data.password.length < 6) {
      return "Password is required and must be at least 6 characters.";
    }
    if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      return "A valid email is required.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, password: true, email: true });
    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to add user.");
        return;
      }
      router.push("/users");
    } catch (err) {
      setError("Network error. Could not add user.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add New User</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
          placeholder="Username"
          className="border rounded px-3 py-2"
          required
        />
        {getFieldError("username") && (
          <div className="text-red-600 text-xs">{getFieldError("username")}</div>
        )}
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          placeholder="Password"
          className="border rounded px-3 py-2"
          required
        />
        {getFieldError("password") && (
          <div className="text-red-600 text-xs">{getFieldError("password")}</div>
        )}
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          placeholder="Email"
          className="border rounded px-3 py-2"
          required
        />
        {getFieldError("email") && (
          <div className="text-red-600 text-xs">{getFieldError("email")}</div>
        )}
        <input
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
          placeholder="Display Name (optional)"
          className="border rounded px-3 py-2"
        />
        <input
          name="profileImageUrl"
          value={form.profileImageUrl}
          onChange={handleChange}
          placeholder="Profile Image URL (optional)"
          className="border rounded px-3 py-2"
        />
        <input
          name="roles"
          value={form.roles?.join(", ")}
          onChange={handleRolesChange}
          placeholder="Roles (comma separated, optional)"
          className="border rounded px-3 py-2"
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition-colors">
          Add User
        </button>
      </form>
    </div>
  );
}
