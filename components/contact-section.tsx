"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { User, Phone, Mail } from "lucide-react"
import { submitContact, type ContactState } from "@/app/actions/contact"

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

  return (
    <section
      ref={ref}
      id="contacts"
      aria-labelledby="contacts-heading"
      className="bg-gradient-to-b from-slate-200 to-slate-100 text-slate-900"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <h2
          id="contacts-heading"
          className="border-b border-dotted border-slate-400/60 pb-5 text-center text-2xl font-black text-slate-900 sm:text-3xl"
        >
          Свяжитесь с нами
        </h2>

        <form action={formAction} className="mt-8">
          <div className="grid gap-8 rounded-xl border border-dotted border-slate-400/50 bg-white/80 p-5 shadow-[0_0_0_1px_rgba(71,85,105,0.15),0_0_20px_rgba(71,85,105,0.08)] sm:p-6 md:grid-cols-2 md:gap-12">
            {/* Наши контакты */}
            <div>
              <h3 className="text-center text-sm font-semibold text-slate-800">
                Наши контакты
              </h3>
              <dl className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
                <div>
                  <dt className="sr-only">Организация</dt>
                  <dd className="font-semibold text-slate-900">
                    ООО &quot;СВК Технолоджи&quot;
                  </dd>
                </div>
                <div>
                  <dt className="inline font-medium text-slate-800">Адрес: </dt>
                  <dd className="inline">
                    Липецкая область, г. Липецк, ул. Виктора Музыки, 3, пом. 16
                  </dd>
                </div>
                <div>
                  <dt className="inline font-medium text-slate-800">Телефон: </dt>
                  <dd className="inline">
                    <a href="tel:+7" className="hover:text-red-700">
                      +7 (___) ___-__-__
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="inline font-medium text-slate-800">E-mail: </dt>
                  <dd className="inline">
                    <a href="mailto:info@svk-tech.ru" className="hover:text-red-700">
                      info@svk-tech.ru
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Оставьте заявку */}
            <div>
              <h3 className="text-center text-sm font-semibold text-slate-800">
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
                    className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-600 focus:outline-none"
                  />
                </Field>
                <Field icon={<Phone className="size-4" />} htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    autoComplete="tel"
                    className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-600 focus:outline-none"
                  />
                </Field>
                <Field icon={<Mail className="size-4" />} htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    autoComplete="email"
                    className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-600 focus:outline-none"
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
          <div className="mt-6 rounded-2xl border border-dotted border-slate-400/50 bg-white/80 p-5 shadow-[0_0_20px_rgba(71,85,105,0.06)] sm:p-6">
            <label htmlFor="message" className="sr-only">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Сообщение"
              className="w-full resize-y bg-transparent text-sm leading-relaxed text-slate-800 placeholder:text-slate-600 focus:outline-none"
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
            {state.status !== "idle" && (
              <p
                role="status"
                className={
                  state.status === "success"
                    ? "text-sm text-emerald-600"
                    : "text-sm text-orange-600"
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
      className="flex items-center gap-3 rounded-lg border border-slate-400/40 bg-white/70 px-3 py-2.5 transition-all duration-200 focus-within:border-red-500 focus-within:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
    >
      <span className="text-slate-700">{icon}</span>
      {children}
    </label>
  )
}
