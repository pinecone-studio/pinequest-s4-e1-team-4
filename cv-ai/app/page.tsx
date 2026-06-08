import { CanvasPanel } from "@/components/canvas-panel";
import { CommandCenter } from "@/components/Command-center";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-background lg:h-screen lg:flex-row lg:overflow-hidden">
      <CommandCenter />
      <CanvasPanel />
    </main>
  );
}
