"use client";
import React, { useId } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | null;
  id?: string;
};

export default function Input({ label, error, id, className = "", ...rest }: Props) {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-md border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-offset-1
          ${error ? "border-red-500" : "border-gray-300"}
          focus:${error ? "ring-red-300" : "ring-[--primary]"} `}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
