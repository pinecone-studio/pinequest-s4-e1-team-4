"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Nevter() {
  const { isSignedIn, isLoaded } = useUser();


  if (!isLoaded) return <div className="h-11 w-11" />; 

  return (
    <div className="flex items-center gap-4">
      {!isSignedIn ? (
        <SignInButton mode="modal">
          <button
            type="button"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#0ea5e9] px-5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(14,165,233,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0284c7]"
          >
            Нэвтрэх
          </button>
        </SignInButton>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
    </div>
  );
}