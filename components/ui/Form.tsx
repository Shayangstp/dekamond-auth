"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
};

export default function Form({ children, onSubmit, className = "" }: Props) {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      {children}
    </form>
  );
}
