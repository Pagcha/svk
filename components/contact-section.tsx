"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { User, Phone, Mail } from "lucide-react"
import { submitContact, type ContactState } from "@/app/actions/contact"
import { setupRevealOnViewport } from "@/lib/utils"

const initialState: ContactState = { status: "idle", message: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(220,38,38,0.3)] transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Отправка…" : "Отправить заявку"}
    </button>
  )
}

export function ContactSection() {
  const [state, formAction] = useActionState(submitContact, initialState)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const cards = Array.from(section.querySelectorAll("[data-contact-reveal]"))
    const revealCards = () => {
      const timers: number[] = []

      cards.forEach((card, index) => {
        const t = window.setTimeout(() => {
          card.classList.add("is-visible")
        }, index * 120)
        timers.push(t)
      })

      return () => timers.forEach((id) => clearTimeout(id))
    }

    return setupRevealOnViewport(section, revealCards, {
      threshold: 0.2,
      viewportFactor: 0.9,
    })
  }, [])

  return (
    <section
      ref={ref}
      id="contacts"
      aria-labelledby="contacts-heading"
      className="relative overflow-hidden border-b border-red-950/40 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.18),transparent_30%),linear-gradient(180deg,#2f0d12_0%,#1c1013_100%)] text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_32%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <h2
          id="contacts-heading"
          className="border-b border-red-400/30 pb-5 text-center text-2xl font-black text-white sm:text-3xl"
        >
          Свяжитесь с нами
        </h2>

        <form action={formAction} className="mt-8">
          <div className="grid gap-8 rounded-3xl border border-red-500/20 bg-white/5 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-6 md:grid-cols-2 md:gap-12">
            {/* Наши контакты */}
            <div data-contact-reveal className="contact-card rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
              <h3 className="text-center text-sm font-semibold text-white/90">
                Наши контакты
              </h3>
              <dl className="mt-4 space-y-2 text-sm leading-relaxed text-white/75">
                <div>
                  <dt className="sr-only">Организация</dt>
                  <dd className="font-semibold text-white">
                    ООО &quot;СВК Технолоджи&quot;
                  </dd>
                </div>
                <div>
                  <dt className="inline font-medium text-white/85">Адрес: </dt>
                  <dd className="inline">
                    Липецкая область, г. Липецк, ул. Виктора Музыки, 3, пом. 16
                  </dd>
                </div>
                <div>
                  <dt className="inline font-medium text-white/85">Телефон: </dt>
                  <dd className="inline">
                    <a href="tel:+7" className="transition hover:text-red-200">
                      +7 (___) ___-__-__
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="inline font-medium text-white/85">E-mail: </dt>
                  <dd className="inline">
                    <a href="mailto:info@svk-tech.ru" className="transition hover:text-red-200">
                      info@svk-tech.ru
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Оставьте заявку */}
            <div data-contact-reveal className="contact-card rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
              <h3 className="text-center text-sm font-semibold text-white/90">
                Оставьте заявку
              </h3>
              <div className="mt-4 space-y-3">
                <Field icon={<User className="size-4" />} htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Имя"
                    autoComplete="name"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                  />
                </Field>
                <Field icon={<Phone className="size-4" />} htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    autoComplete="tel"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                  />
                </Field>
                <Field icon={<Mail className="size-4" />} htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    autoComplete="email"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Honeypot для защиты от ботов */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="company">Не заполняйте это поле</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Сообщение */}
          <div data-contact-reveal className="contact-card mt-6 rounded-2xl border border-red-400/30 bg-white/5 p-5 shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-200 focus-within:border-red-300 focus-within:shadow-[0_0_0_3px_rgba(251,113,133,0.15)] sm:p-6">
            <label htmlFor="message" className="sr-only">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Сообщение"
              className="w-full resize-y bg-transparent text-sm leading-relaxed text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
            {state.status !== "idle" && (
              <p
                role="status"
                className={
                  state.status === "success"
                    ? "text-sm text-emerald-300"
                    : "text-sm text-amber-200"
                }
              >
                {state.message}
              </p>
            )}
            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({
  icon,
  htmlFor,
  children,
}: {
  icon: React.ReactNode
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-white transition-all duration-200 focus-within:border-red-300 focus-within:bg-white/8 focus-within:shadow-[0_0_0_3px_rgba(251,113,133,0.18)]"
    >
      <span className="text-red-200">{icon}</span>
      {children}
    </label>
  )
}
