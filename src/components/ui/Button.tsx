import Link from "next/link";
import type { ComponentProps } from "react";

export type ButtonVariant = "primary" | "outline" | "dark";
export type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-(--dur-short) ease-out-expo";

const sizes: Record<ButtonSize, string> = {
  md: "h-13 px-7 text-[0.9375rem]",
  sm: "h-10 px-5 text-sm",
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-orange-500 text-ink-950 hover:bg-orange-300",
  outline:
    "border border-line text-paper hover:border-violet-400 hover:text-violet-400",
  dark: "bg-ink-950 text-paper hover:bg-ink-800",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  className = "",
  size: ButtonSize = "md",
) {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
