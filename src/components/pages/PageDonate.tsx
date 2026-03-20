import { useState } from "react";

const TIERS = [
  {
    id: "vip",
    name: "VIP",
    price: 299,
    period: "мес",
    emoji: "🌿",
    color: "#22c55e",
    accent: "green",
    perks: [
      "Префикс [VIP] в чате",
      "Дополнительный /home x3",
      "Доступ к VIP-зонам",
      "Цветной ник",
      "Приоритет в очереди",
    ],
    popular: false,
  },
  {
    id: "elite",
    name: "ELITE",
    price: 599,
    period: "мес",
    emoji: "⭐",
    color: "#f59e0b",
    accent: "amber",
    perks: [
      "Префикс [ELITE] в чате",
      "Дополнительный /home x10",
      "Полёт в мирном мире",
      "Кастомный ник и цвет",
      "Все бонусы VIP",
      "Личный склад x2",
    ],
    popular: true,
  },
  {
    id: "legend",
    name: "LEGEND",
    price: 999,
    period: "мес",
    emoji: "🔥",
    color: "#ef4444",
    accent: "red",
    perks: [
      "Префикс [LEGEND] в чате",
      "Безлимитные /home",
      "Полёт везде",
      "God Mode в мирном",
      "Личный регион 256x256",
      "Все бонусы ELITE",
      "Доступ к бета-функциям",
    ],
    popular: false,
  },
];

const ONESHOT = [
  { name: "Стартовый набор", price: 99, emoji: "🎁", desc: "Базовое снаряжение для новичка" },
  { name: "Монеты x1000", price: 149, emoji: "💰", desc: "Игровая валюта на аукцион" },
  { name: "Кейс с редкостью", price: 199, emoji: "🎰", desc: "Случайный предмет редкости" },
  { name: "Смена ника", price: 49, emoji: "✏️", desc: "Одноразовая смена ника" },
];

export default function PageDonate() {
  const [period, setPeriod] = useState<"month" | "year">("month");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="text-white/30 text-sm font-mono uppercase tracking-widest mb-4">поддержка</div>
        <h1 className="text-5xl font-black mb-3">💎 донат</h1>
        <p className="text-white/40 text-lg max-w-lg">поддержи сервер и получи привилегии, которые делают игру ещё круче</p>
      </div>

      {/* Period toggle */}
      <div className="flex items-center gap-1 bg-[#161616] border border-white/5 rounded-full p-1 w-fit mb-12">
        <button
          onClick={() => setPeriod("month")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
            period === "month" ? "bg-white text-black" : "text-white/50 hover:text-white"
          }`}
        >
          месяц
        </button>
        <button
          onClick={() => setPeriod("year")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
            period === "year" ? "bg-white text-black" : "text-white/50 hover:text-white"
          }`}
        >
          год
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">−20%</span>
        </button>
      </div>

      {/* Tiers */}
      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {TIERS.map((tier) => {
          const price = period === "year" ? Math.round(tier.price * 12 * 0.8) : tier.price;
          const sub = period === "year" ? "год" : "мес";
          return (
            <div
              key={tier.id}
              className={`relative bg-[#161616] border rounded-3xl p-6 flex flex-col transition-all duration-300 hover:bg-[#1a1a1a] ${
                tier.popular ? "border-white/25 scale-[1.02]" : "border-white/5"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black font-bold text-xs px-4 py-1 rounded-full">
                  ★ популярный
                </div>
              )}

              <div className="text-4xl mb-3">{tier.emoji}</div>
              <div className="font-black text-2xl mb-1" style={{ color: tier.color }}>{tier.name}</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">{price}₽</span>
                <span className="text-white/30">/ {sub}</span>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {tier.perks.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="mt-0.5 text-xs" style={{ color: tier.color }}>✦</span>
                    {p}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-full font-bold text-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: tier.popular ? "white" : tier.color + "20",
                  color: tier.popular ? "black" : tier.color,
                  border: tier.popular ? "none" : `1px solid ${tier.color}40`,
                }}
              >
                купить {tier.name}
              </button>
            </div>
          );
        })}
      </div>

      {/* One-shot purchases */}
      <div>
        <h2 className="text-3xl font-black mb-6">разовые покупки</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ONESHOT.map((item, i) => (
            <div
              key={i}
              className="bg-[#161616] border border-white/5 hover:border-white/15 rounded-2xl p-4 transition-all hover:bg-[#1a1a1a] group"
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <div className="font-bold text-sm mb-1">{item.name}</div>
              <div className="text-white/40 text-xs mb-3 leading-relaxed">{item.desc}</div>
              <div className="flex items-center justify-between">
                <span className="font-black text-lg">{item.price}₽</span>
                <button className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black text-xs font-bold transition-all">
                  купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
