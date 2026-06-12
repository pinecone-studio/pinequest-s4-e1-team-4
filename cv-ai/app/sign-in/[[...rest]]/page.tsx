import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8f3]">
      <SignIn fallbackRedirectUrl="/cv" signUpUrl="/sign-up" />
    </div>
  );
}
