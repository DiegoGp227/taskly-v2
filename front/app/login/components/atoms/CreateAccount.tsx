"use client";
import Link from "next/link";

export default function CreateAccount() {
  return (
    <Link
      href="/sign_up"
      className="no-underline text-soft-gray transition-colors duration-2000 hover:text-green"
    >
      Create Account?
    </Link>
  );
}

