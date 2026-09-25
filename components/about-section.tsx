"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export function AboutSection() {
  const ref = useRef<HTMLElement | null>(null)

  return (
    <section ref={ref} id="about" aria-labelledby="about-heading" className="border-b border-gray-300/50 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <h2
          id="about-heading"
          className="mb-8 text-center text-2xl font-black text-black sm:text-3xl"
        >
          О нас
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="flex items-center rounded-3xl border border-red-300/40 bg-gradient-to-br from-red-50 to-white p-6 shadow-[0_4px_12px_rgba(220,38,38,0.06)] sm:p-8">
            <p className="text-pretty leading-relaxed text-slate-700">
              Компания «СВК Технолоджи» специализируется на комплексных
              инженерных решениях: от проектирования и подбора оборудования до
              монтажа, пусконаладки и сервисного обслуживания. Мы работаем с
              ведущими производителями и предлагаем индивидуальный подход к
              каждому проекту, гарантируя надёжность и высокое качество на всех
              этапах сотрудничества.
            </p>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-3xl border border-red-300/40 bg-gradient-to-br from-red-50 to-white shadow-[0_4px_12px_rgba(220,38,38,0.06)]">
            <Image
              src="/about-facility.png"
              alt="Производственный объект компании СВК Технолоджи"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
