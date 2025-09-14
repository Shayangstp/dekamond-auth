"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { StoredUser } from "../types/user";

const STORAGE_KEY = "interview_user";

export function useAuth(redirectToLogin = true) {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setUser(JSON.parse(raw));
    } else if (redirectToLogin) {
      router.replace("/");
    }
    setLoading(false);
  }, [router, redirectToLogin]);

  const login = (userData: StoredUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
    router.push("/welcome");
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    router.push("/");
  };

  return { user, loading, login, logout };
}
