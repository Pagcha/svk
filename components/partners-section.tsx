const partners = [
  {
    name: "MetalWork",
    src: "/logos/metalwork.png",
    description: "Итальянский производитель премиального пневмооборудования, известное надежностью и высокими стандартами качества в сфере промышленной автоматизации. Компания предлагает широкий спектр высокоточных компонентов — от пневмоцилиндров до систем подготовки воздуха, идеально подходящих для сложных эксплуатационных условий.",
  },
  {
    name: "Festo",
    src: "/logos/festo.png",
    description: "Немецкий технологический гигант и признанный эталон в сфере промышленной автоматизации и пневматических систем. Инновационные решения Festo задают стандарты эффективности, цифровизации и точности по всему миру.",
  },
  {
    name: "Camozzi",
    src: "/logos/camozzi.png",
    description: "Итальянский производитель пневматических компонентов, сочетающий инновационные инженерные разработки с европейским качеством. Продукция компании широко используется для автоматизации производственных процессов и управления технологическими потоками.",
  },
  {
    name: "Airtac",
    src: "/logos/airtac.png",
    description: "Один из крупнейших международных поставщиков высококлассного пневмооборудования с современным производством в Азии. Продукция бренда ценятся за функциональность, широкую номенклатуру и высокую экономическую эффективность.",
  },
  {
    name: "Pemaks",
    src: "/logos/pemaks.png",
    description: "Турецкий бренд, специализирующийся на производстве высококачественных пневмоцилиндров и вспомогательного оборудования. Компания предлагает оптимальное соотношение доступной цены и долговечности для решения базовых и специализированных задач.",
  },
] as const

export function PartnersSection() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="border-b border-gray-300/50 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <h2
          id="partners-heading"
          className="mb-12 text-center text-2xl font-black text-black sm:text-3xl"
        >
          Генеральные партнёры компании
        </h2>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-5">
  {partners.map(({ name, src, description }) => (
    <li key={name} className="w-full">
      <div className="group relative flex aspect-[1/1.45] w-full items-center justify-center overflow-hidden rounded-3xl border border-gray-300/50 bg-gradient-to-br from-white to-slate-50 p-3 shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-400/60 hover:shadow-[0_8px_24px_rgba(220,38,38,0.12)]">
        <img
          src={src}
          alt={name}
          className="h-full w-full object-contain transition duration-300 group-hover:brightness-75"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/15 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="max-w-[80%] rounded-xl border border-slate-400/40 bg-white/95 px-3 py-2 text-center backdrop-blur-sm">
            <div className="text-sm font-bold text-slate-900">{name}</div>
            <p className="mt-1 text-[10px] leading-relaxed text-slate-700">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  ))}
</ul>
      </div>
    </section>
  )
}
