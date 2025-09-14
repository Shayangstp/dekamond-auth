"use client";
import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  loading,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium transition cursor-pointer",
        variant === "primary" &&
          "bg-blue-600 text-white hover:bg-blue-700 disabled:hover:bg-blue-600",
        variant === "ghost" && "bg-transparent text-[--primary]",
        props.disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
        </svg>
      ) : null}
      <span className={loading ? "ml-2" : ""}>{children}</span>
    </button>
  );
}
