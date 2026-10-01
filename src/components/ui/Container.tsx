import type { ComponentProps } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-[1600px] px-(--gutter) ${className}`}
      {...props}
    />
  );
}
