"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";
import Container from "./Container";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  console.log(path);

  const links = ["Discover", "Portfolio", "Upload"];

  return (
    <>
      <header className="w-screen shadow rounded-t-none rounded-xl bg-gray-50">
        <Container className="flex justify-between items-center p-4 gap-4">
          <div className="flex gap-8">
            <Link
              href="/"
              className="font-black flex items-center text-2xl text-rose-600 hover:text-rose-700"
            >
              MESHI
            </Link>
            <div className="flex items-center">
              {links.map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className={`p-2 font-medium ${`/${link.toLowerCase()}` === path ? "text-gray-800" : "text-gray-500"} hover:text-gray-800`}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <SignedOut>
              <SignInButton>
                <button className="bg-gray-200 hover:scale-105 active:bg-gray-300 active:scale-95 text-gray-800 font-medium rounded-xl px-4 py-3 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-rose-600 hover:scale-105 active:bg-rose-800 active:scale-95 text-white font-medium rounded-xl px-4 py-3 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Container>
      </header>
    </>
  );
}
