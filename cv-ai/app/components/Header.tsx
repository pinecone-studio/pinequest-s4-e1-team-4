import { UserButton, SignInButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="font-bold">My App</div>
      <nav>
        <UserButton />
        <SignInButton mode="modal" />
      </nav>
    </header>
  );
}
