import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition";
  const variants = {
    primary: "bg-ink-900 text-mist-50 hover:bg-ink-800",
    secondary: "border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-mist-50",
    ghost: "text-ink-900 hover:bg-mist-200",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}
