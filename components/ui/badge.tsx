import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-mist-300 bg-mist-100 px-3 py-1 text-xs text-ink-700",
        className
      )}
      {...props}
    />
  );
}
