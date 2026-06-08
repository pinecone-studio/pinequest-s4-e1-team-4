import { CommandInput } from "./Command-input";
import { Conversation } from "./Conversation";
import { FloatingNav } from "./floating-nav";

export function CommandCenter() {
  return (
    <section className="flex h-screen w-full flex-col border-b border-border lg:w-1/2 lg:border-b-0 lg:border-r">
      <header className="flex items-center gap-2 px-8 py-5">
        <span className="text-sm font-medium text-foreground">
          Resume Coach
        </span>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm text-muted-foreground">Active Session</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="h-1.5 w-1.5 rounded-full bg-foreground"
            aria-hidden="true"
          />
          Live
        </span>
      </header>

      <Conversation />
      <CommandInput />
      <FloatingNav />
    </section>
  );
}
