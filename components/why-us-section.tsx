const reasons = [
  "Более 10 лет опыта на рынке. Работаем в сфере промышленного снабжения с 2015 года. За это время мы заслужили доверие крупнейших предприятий региона (включая ПАО «НЛМК» и «Лебедяньмолоко»), успешно решая задачи для тяжелой металлургии и пищевой промышленности.",
  "Сборка строго по вашему ТЗ. Исключаем любые отклонения от конструкторской документации. Собираем пневмомеханизмы и сложные пневмосхемы в точном соответствии с вашими инженерными чертежами, стандартами и спецификациями.",
  "Комплексные поставки компонентов. Не ограничиваемся стандартными решениями. Поставляем широкий спектр промышленного оборудования — от пневматики и гидравлики до компрессорных систем и КИПиА. Вы получаете все необходимые узлы от одного надежного партнера.",
  "Собственный склад в Липецке. Оперативно комплектуем заказы и осуществляем сборку благодаря отлаженной логистике и постоянному наличию востребованного пневмооборудования на складе. Это минимизирует сроки отгрузки и защищает ваши линии от простоев.",
]

export function WhyUsSection() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="border-b border-gray-300/50 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_2fr] lg:items-center lg:gap-12 lg:py-16">
        <h2
          id="why-us-heading"
          className="text-2xl font-black text-black sm:text-3xl"
        >
          Почему мы?
        </h2>

        <ul className="grid gap-6 sm:grid-cols-2">
          {reasons.map((text, index) => (
            <li key={index}>
              <article className="h-full rounded-3xl border border-gray-300/40 bg-gradient-to-br from-red-50 to-white p-6 shadow-[0_4px_12px_rgba(220,38,38,0.04)] transition-transform duration-300 hover:-translate-y-1">
                <p className="text-sm leading-relaxed text-slate-700">{text}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
