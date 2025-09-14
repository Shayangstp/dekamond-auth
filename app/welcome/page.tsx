"use client";
import React from "react";
import Button from "../../components/ui/button";
import { useAuth } from "@/hooks/useLogin";

export default function WelcomePage() {
  const { user, logout, loading } = useAuth(true);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return null;

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 max-w-xl px-10 mx-auto">
      {user.picture && (
        <img
          src={user.picture}
          alt={`${user.name} avatar`}
          className="h-24 w-24 rounded-full object-cover"
        />
      )}
      <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
      <p className="text-sm text-[--muted]">{user.email}</p>
      <div className="pt-4 w-full">
        <Button variant="primary" onClick={logout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
}
