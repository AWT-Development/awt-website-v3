"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { buttonClass } from "@/components/ui/Button";
import {
  UNSURE_ID,
  briefingBudgets,
  briefingTimelines,
  unsureLabel,
} from "@/content/briefing";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import {
  BRIEFING_SERVICE_EVENT,
  isContactValid,
  whatsappUrl,
  type Briefing,
} from "@/lib/briefing";
import { submitBriefing } from "@/lib/actions/briefing";

type BriefingFormProps = { lang: Locale; dict: Dictionary["contact"]["form"] };

const TOTAL_STEPS = 5;
const OPTIONAL_STEPS = [1, 2, 3];

type Status = "idle" | "sending" | "done";

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full border px-5 py-3 text-[0.9375rem] transition-colors duration-(--dur-short) ease-out-expo ${
        selected
          ? "border-orange-500 bg-orange-500 text-ink-950"
          : "border-line text-paper/80 hover:border-paper/40"
      }`}
    >
      {children}
    </button>
  );
}

export function BriefingForm({ lang, dict }: BriefingFormProps) {
  const [step, setStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>();
  const [timeline, setTimeline] = useState<string>();
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [trap, setTrap] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [emailSent, setEmailSent] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const movedRef = useRef(false);

  useEffect(() => {
    const onService = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail;
      setSelectedServices([slug]);
      setStatus("idle");
      setError(null);
      setStep(0);
    };
    window.addEventListener(BRIEFING_SERVICE_EVENT, onService);
    return () => window.removeEventListener(BRIEFING_SERVICE_EVENT, onService);
  }, []);

  useEffect(() => {
    if (!movedRef.current) return;
    headingRef.current?.focus({ preventScroll: true });
  }, [step, status]);

  const toggleService = (id: string) => {
    setError(null);
    setSelectedServices((current) => {
      if (id === UNSURE_ID) return current.includes(id) ? [] : [UNSURE_ID];
      const withoutUnsure = current.filter((item) => item !== UNSURE_ID);
      return withoutUnsure.includes(id)
        ? withoutUnsure.filter((item) => item !== id)
        : [...withoutUnsure, id];
    });
  };

  function validate(current: number) {
    if (current === 0 && selectedServices.length === 0) {
      setError(dict.errors.services);
      return false;
    }
    if (current === 4) {
      if (name.trim().length < 2) {
        setError(dict.errors.name);
        return false;
      }
      if (!isContactValid(contact)) {
        setError(dict.errors.contact);
        return false;
      }
    }
    setError(null);
    return true;
  }

  const go = (to: number) => {
    movedRef.current = true;
    setError(null);
    setStep(to);
  };

  const next = () => {
    if (validate(step)) go(step + 1);
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate(step)) return;

    const data: Briefing = {
      services: selectedServices,
      budget,
      timeline,
      details: details.trim() || undefined,
      name: name.trim(),
      contact: contact.trim(),
      lang,
    };

    const url = whatsappUrl(data);
    setWhatsapp(url);
    setStatus("sending");
    movedRef.current = true;

    // A janela precisa abrir no clique (antes do `await`) para o navegador
    // não bloquear; o endereço do WhatsApp entra depois.
    const popup = window.open("", "_blank");
    if (popup) popup.opener = null;

    const result = await submitBriefing({ ...data, website: trap }).catch(
      () => null,
    );

    setEmailSent(Boolean(result?.ok && result.emailSent));
    setStatus("done");
    // Se o e-mail falhar, o WhatsApp ainda leva o briefing.
    if (popup) popup.location.href = url;
  }

  const stepContent = dict.steps;
  const titles = [
    stepContent.services.title,
    stepContent.budget.title,
    stepContent.timeline.title,
    stepContent.details.title,
    stepContent.contact.title,
  ];
  const hints = [
    stepContent.services.hint,
    stepContent.budget.hint,
    stepContent.timeline.hint,
    stepContent.details.hint,
    undefined,
  ];

  const inputClass =
    "w-full rounded-2xl border border-line bg-ink-900 px-5 py-4 text-paper placeholder:text-muted focus:border-orange-500 focus:outline-none";

  if (status === "done") {
    return (
      <div className="flex min-h-[28rem] flex-col justify-center gap-6 rounded-[2rem] bg-ink-950 p-6 text-paper md:p-10">
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="text-h2 text-balance outline-none"
        >
          {dict.done.title}
        </h3>
        <p className="max-w-md text-muted">
          {emailSent ? dict.done.textSent : dict.done.textFallback}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary")}
          >
            {dict.done.whatsapp} <span aria-hidden>↗</span>
          </a>
          <button
            type="button"
            className={buttonClass("outline")}
            onClick={() => {
              setStatus("idle");
              setStep(0);
              setSelectedServices([]);
              setBudget(undefined);
              setTimeline(undefined);
              setDetails("");
              setName("");
              setContact("");
            }}
          >
            {dict.done.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="flex min-h-[28rem] flex-col gap-8 rounded-[2rem] bg-ink-950 p-6 text-paper md:p-10"
    >
      <div>
        <p className="label text-muted">
          {dict.progress
            .replace("{current}", String(step + 1))
            .replace("{total}", String(TOTAL_STEPS))}
        </p>
        <div className="mt-4 flex gap-2" aria-hidden>
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <span
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors duration-(--dur-base) ease-out-expo ${
                index <= step ? "bg-orange-500" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      <div key={step} className="step-enter flex flex-1 flex-col gap-6">
        <div>
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="text-h3 text-balance outline-none"
          >
            {titles[step]}
          </h3>
          {hints[step] && <p className="mt-2 text-muted">{hints[step]}</p>}
        </div>

        {step === 0 && (
          <div className="flex flex-wrap gap-3">
            {services.map((service) => (
              <Chip
                key={service.slug}
                selected={selectedServices.includes(service.slug)}
                onClick={() => toggleService(service.slug)}
              >
                {service.title[lang]}
              </Chip>
            ))}
            <Chip
              selected={selectedServices.includes(UNSURE_ID)}
              onClick={() => toggleService(UNSURE_ID)}
            >
              {unsureLabel[lang]}
            </Chip>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-wrap gap-3">
            {briefingBudgets.map((item) => (
              <Chip
                key={item.id}
                selected={budget === item.id}
                onClick={() => setBudget(budget === item.id ? undefined : item.id)}
              >
                {item.label[lang]}
              </Chip>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-wrap gap-3">
            {briefingTimelines.map((item) => (
              <Chip
                key={item.id}
                selected={timeline === item.id}
                onClick={() =>
                  setTimeline(timeline === item.id ? undefined : item.id)
                }
              >
                {item.label[lang]}
              </Chip>
            ))}
          </div>
        )}

        {step === 3 && (
          <textarea
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            rows={6}
            maxLength={2000}
            placeholder={stepContent.details.placeholder}
            aria-label={stepContent.details.title}
            className={`${inputClass} resize-none`}
          />
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={stepContent.contact.name}
              aria-label={stepContent.contact.name}
              autoComplete="name"
              maxLength={100}
              className={inputClass}
            />
            <input
              type="text"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder={stepContent.contact.contact}
              aria-label={stepContent.contact.contact}
              inputMode="email"
              maxLength={120}
              className={inputClass}
            />
            <input
              type="text"
              name="website"
              value={trap}
              onChange={(event) => setTrap(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] size-px opacity-0"
            />
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-orange-300">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className={buttonClass("outline")}
          >
            {dict.back}
          </button>
        )}

        {step < TOTAL_STEPS - 1 ? (
          <button type="button" onClick={next} className={buttonClass("primary")}>
            {dict.next} <span aria-hidden>→</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "sending"}
            className={`${buttonClass("primary")} disabled:opacity-60`}
          >
            {status === "sending" ? dict.sending : dict.send}
          </button>
        )}

        {OPTIONAL_STEPS.includes(step) && (
          <button
            type="button"
            onClick={() => go(step + 1)}
            className="label ml-auto px-2 py-3 text-muted transition-colors hover:text-paper"
          >
            {dict.skip}
          </button>
        )}
      </div>
    </form>
  );
}
