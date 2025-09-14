"use client";
import React from "react";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import Form from "../components/ui/Form";
import { useAuth } from "@/hooks/useLogin";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth(false);
  const { form, handleLogin, loading } = useLogin(login);

  return (
    <div id="container" className="flex h-screen max-w-xl mx-auto flex-col justify-center px-10">
      <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
      <p className="text-sm text-[--muted] mb-6">
        Enter your mobile number (Iran formats supported)
      </p>

      <Form onSubmit={form.handleSubmit(handleLogin)}>
        <Input
          label="Mobile phone"
          placeholder="e.g. 0912XXXXXXXX"
          {...form.register("phone")}
          error={form.formState.errors.phone?.message}
          inputMode="tel"
          autoComplete="tel"
        />
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={!form.formState.isValid || loading}
          className="w-full"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Form>
    </div>
  );
}
