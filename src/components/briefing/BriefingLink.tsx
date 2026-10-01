"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import {
  buttonClass,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button";
import { BRIEFING_SERVICE_EVENT } from "@/lib/briefing";

type BriefingLinkProps = {
  /** Slug do serviço a pré-selecionar no formulário. */
  service?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

/** Leva ao briefing (`#contato`), opcionalmente com um serviço já marcado. */
export function BriefingLink({
  service,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: BriefingLinkProps) {
  const pathname = usePathname();
  const home = /^\/en(\/|$)/.test(pathname) ? "/en" : "/";
  const href = pathname === home ? "#contato" : `${home}#contato`;

  return (
    <a
      href={href}
      className={buttonClass(variant, className, size)}
      onClick={() => {
        if (service) {
          window.dispatchEvent(
            new CustomEvent(BRIEFING_SERVICE_EVENT, { detail: service }),
          );
        }
      }}
    >
      {children}
    </a>
  );
}
