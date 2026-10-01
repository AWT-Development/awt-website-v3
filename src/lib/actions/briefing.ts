"use server";

import { site } from "@/content/site";
import { emailBody, isEmail, type BriefingResult } from "@/lib/briefing";
import { briefingSchema } from "@/lib/briefing-schema";

/**
 * Envia o briefing por e-mail (Resend, API REST). O WhatsApp é aberto pelo
 * navegador com a mesma mensagem. Sem `RESEND_API_KEY`, só o WhatsApp leva o briefing.
 */
export async function submitBriefing(input: unknown): Promise<BriefingResult> {
  // Campo-isca: invisível para pessoas, preenchido por robôs.
  if (
    typeof input === "object" &&
    input !== null &&
    "website" in input &&
    input.website
  ) {
    return { ok: true, emailSent: false };
  }

  const parsed = briefingSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const data = parsed.data;
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.warn(
      "[briefing] RESEND_API_KEY não configurada: briefing não enviado por e-mail.",
    );
    return { ok: true, emailSent: false };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.BRIEFING_FROM ?? "AWT Site <onboarding@resend.dev>",
        to: [process.env.BRIEFING_TO ?? site.email],
        subject: `Novo briefing: ${data.name}`,
        text: emailBody(data),
        ...(isEmail(data.contact) && { reply_to: data.contact.trim() }),
      }),
    });

    if (!response.ok) {
      console.error("[briefing] Resend respondeu", response.status);
      return { ok: false, error: "failed" };
    }
    return { ok: true, emailSent: true };
  } catch (error) {
    console.error("[briefing] falha ao enviar e-mail", error);
    return { ok: false, error: "failed" };
  }
}
