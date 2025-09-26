import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";
import Container from "./Container";

export default function Header() {
  return (
    <>
      <header className="w-screen shadow rounded-t-none rounded-xl">
        <Container className="flex justify-between items-center p-4 gap-4">
          <Link
            href="/"
            className="font-black text-xl text-rose-600 hover:text-rose-700"
          >
            MESHI
          </Link>
          <div className="flex justify-end gap-4">
            <SignedOut>
              <SignInButton>
                <button className="bg-gray-100 hover:scale-105 active:bg-gray-300 active:scale-95 text-gray-800 font-medium rounded-xl px-4 py-3 cursor-pointer">
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
