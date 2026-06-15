import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/cv(.*)",
  "/api/clerk(.*)",
  "/api/chat(.*)",
  "/api/tts(.*)",
  "/api/chimege-tts(.*)",
  "/api/cv-extract(.*)",
  "/api/cv-ai(.*)",
  "/api/voice(.*)",
  "/api/chimege-stt(.*)",
  "/api/interview(.*)",
  "/api/evaluate(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
