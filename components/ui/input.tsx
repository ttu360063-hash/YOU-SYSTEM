import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-mist-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink-800",
        className
      )}
      {...props}
    />
  );
}
