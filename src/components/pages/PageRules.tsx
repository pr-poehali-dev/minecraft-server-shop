const SECTIONS = [
  {
    title: "общение",
    emoji: "💬",
    rules: [
      { id: "1.1", text: "Запрещены оскорбления, дискриминация и унижение игроков по любому признаку" },
      { id: "1.2", text: "Флуд, спам и злоупотребление CAPS LOCK — мут на 30 минут" },
      { id: "1.3", text: "Запрещено обсуждение политики, религии и других деструктивных тем" },
      { id: "1.4", text: "Угрозы в адрес игроков или администрации — немедленный бан" },
    ],
  },
  {
    title: "игровой процесс",
    emoji: "⚔️",
    rules: [
      { id: "2.1", text: "Использование читов, макросов и сторонних модов с преимуществом — бан навсегда" },
      { id: "2.2", text: "Гриферство чужих построек без разрешения — временный бан от 3 до 14 дней" },
      { id: "2.3", text: "Эксплуатация багов и дюп предметов — блокировка аккаунта" },
      { id: "2.4", text: "PvP только в специально отведённых зонах или с взаимного согласия" },
    ],
  },
  {
    title: "торговля",
    emoji: "💰",
    rules: [
      { id: "3.1", text: "Мошенничество при обменах и сделках — вечный бан без права апелляции" },
      { id: "3.2", text: "Запрещена продажа игровых ценностей за реальные деньги вне официального магазина" },
      { id: "3.3", text: "Ценовой сговор и монополизация рынка — предупреждение и штраф" },
    ],
  },
  {
    title: "постройки",
    emoji: "🏗️",
    rules: [
      { id: "4.1", text: "Запрещено строительство в радиусе 100 блоков от чужих регионов без разрешения" },
      { id: "4.2", text: "Неэстетичные постройки рядом со спавном могут быть удалены администрацией" },
      { id: "4.3", text: "Фермы мобов с нагрузкой на сервер ограничены — не более 50 мобов в чанке" },
    ],
  },
  {
    title: "реклама",
    emoji: "📢",
    rules: [
      { id: "5.1", text: "Реклама других серверов и сторонних ресурсов — немедленный бан" },
      { id: "5.2", text: "Распространение личных данных других игроков — бан" },
      { id: "5.3", text: "Ссылки на вредоносные сайты — перманентный бан" },
    ],
  },
];

const PUNISHMENTS = [
  { level: "предупреждение", desc: "Первое незначительное нарушение", color: "#f59e0b" },
  { level: "мут", desc: "Нарушения в чате, спам", color: "#8b5cf6" },
  { level: "кик", desc: "Повторные или средние нарушения", color: "#f97316" },
  { level: "бан (7 дней)", desc: "Серьёзные нарушения", color: "#ef4444" },
  { level: "перманентный бан", desc: "Критические нарушения, читы", color: "#dc2626" },
];

export default function PageRules() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="text-white/30 text-sm font-mono uppercase tracking-widest mb-4">регламент</div>
        <h1 className="text-5xl font-black mb-3">📋 правила</h1>
        <p className="text-white/40 text-lg">
          соблюдение правил — залог комфортной игры для всех. незнание правил не освобождает от ответственности.
        </p>
      </div>

      {/* Rules */}
      <div className="space-y-6 mb-14">
        {SECTIONS.map((section) => (
          <div key={section.title} className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
              <span className="text-2xl">{section.emoji}</span>
              <h2 className="font-bold text-lg">{section.title}</h2>
            </div>
            <div className="divide-y divide-white/5">
              {section.rules.map((rule) => (
                <div key={rule.id} className="flex gap-4 px-6 py-4">
                  <span className="font-mono text-sm text-white/20 shrink-0 pt-0.5">{rule.id}</span>
                  <p className="text-white/70 text-sm leading-relaxed">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Punishments */}
      <div className="mb-10">
        <h2 className="text-2xl font-black mb-5">система наказаний</h2>
        <div className="space-y-3">
          {PUNISHMENTS.map((p, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-[#161616] border border-white/5 rounded-xl">
              <div
                className="w-2 h-10 rounded-full shrink-0"
                style={{ backgroundColor: p.color }}
              />
              <div>
                <div className="font-bold text-sm" style={{ color: p.color }}>{p.level}</div>
                <div className="text-white/40 text-sm">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appeal */}
      <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 flex gap-4">
        <span className="text-3xl shrink-0">⚖️</span>
        <div>
          <h3 className="font-bold text-lg mb-2">апелляция</h3>
          <p className="text-white/40 text-sm leading-relaxed">
            если вы считаете наказание несправедливым — обратитесь в Discord-сервер в раздел #апелляции.
            администрация рассматривает все обращения в течение 48 часов.
          </p>
        </div>
      </div>
    </div>
  );
}
