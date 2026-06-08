"use client";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export default function Clerk() {
  return (
    <nav className="... таны өөрийн гоё дизайн ...">
      <Show when="signed-out">
        <SignInButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </nav>
  );
}
