import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8f3]">
      <SignUp 
        fallbackRedirectUrl="/cv"
        signInUrl="/sign-in"
      />
    </div>
  );
}
