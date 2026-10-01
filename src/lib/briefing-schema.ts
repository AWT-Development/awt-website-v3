import "server-only";
import { z } from "zod";

import { locales } from "@/i18n/config";
import {
  budgetIds,
  isContactValid,
  serviceIds,
  timelineIds,
  type Briefing,
} from "@/lib/briefing";

export const briefingSchema: z.ZodType<Briefing> = z.object({
  services: z
    .array(z.string().refine((id) => serviceIds.includes(id)))
    .min(1)
    .max(serviceIds.length),
  budget: z
    .string()
    .refine((id) => budgetIds.includes(id))
    .optional(),
  timeline: z
    .string()
    .refine((id) => timelineIds.includes(id))
    .optional(),
  details: z.string().trim().max(2000).optional(),
  name: z.string().trim().min(2).max(100),
  contact: z.string().trim().max(120).refine(isContactValid),
  lang: z.enum(locales),
});
