import { clsx } from "clsx";
import Phoenix from "./Phoenix";

export default function Screen({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={clsx(
        "relative mx-auto max-w-[560px] min-h-[calc(100vh- env(safe-area-inset-top)- env(safe-area-inset-bottom))] flex flex-col items-center justify-center text-center",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(600px 400px at 20% 20%, rgba(255,107,107,0.22), transparent 60%), radial-gradient(500px 400px at 80% 30%, rgba(255,207,92,0.20), transparent 60%)",
            filter: "blur(20px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,107,107,0.10), rgba(255,154,90,0.08), rgba(255,207,92,0.06))",
            mixBlendMode: "screen",
          }}
        />
      </div>
      {children}
    </main>
  );
}
