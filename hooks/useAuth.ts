"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { iranMobileRegex, normalizeIranPhone } from "../lib/validations";
import type { StoredUser } from "../types/user";

const LoginSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone is required")
    .refine((v) => iranMobileRegex.test(v), {
      message: "Invalid Iranian phone. Accepts 09..., +98..., 0098...",
    }),
});

export type LoginData = z.infer<typeof LoginSchema>;

export function useLogin(onSuccess: (user: StoredUser) => void) {
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      if (!res.ok) throw new Error("API Error");
      const payload = await res.json();
      const user = payload.results[0];
      const stored: StoredUser = {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        picture: user.picture?.large ?? null,
        phone: normalizeIranPhone(data.phone),
      };
      onSuccess(stored);
    } catch (err) {
      console.error(err);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { form, handleLogin, loading };
}
