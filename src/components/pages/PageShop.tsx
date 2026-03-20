import { useState } from "react";

type Category = "all" | "tools" | "armor" | "potions" | "resources";

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "all", label: "все", emoji: "🛍️" },
  { id: "tools", label: "инструменты", emoji: "⛏️" },
  { id: "armor", label: "броня", emoji: "🛡️" },
  { id: "potions", label: "зелья", emoji: "🧪" },
  { id: "resources", label: "ресурсы", emoji: "📦" },
];

const ITEMS = [
  { id: 1, name: "Набор шахтёра", price: 149, oldPrice: 199, emoji: "⛏️", desc: "Алмазная кирка + факелы x64 + еда", cat: "tools" as Category, hot: false, new: true },
  { id: 2, name: "Зелье силы II", price: 99, oldPrice: null, emoji: "🧪", desc: "Зелье силы II x10 — на 8 мин каждое", cat: "potions" as Category, hot: true, new: false },
  { id: 3, name: "Сундук ресурсов", price: 249, oldPrice: 349, emoji: "📦", desc: "Случайные редкие ресурсы + крафтовые", cat: "resources" as Category, hot: false, new: false },
  { id: 4, name: "Сет воина", price: 399, oldPrice: null, emoji: "⚔️", desc: "Алмазная броня + меч + зачарование", cat: "armor" as Category, hot: true, new: false },
  { id: 5, name: "Эндер-жемчуг", price: 79, oldPrice: null, emoji: "💎", desc: "Эндер-жемчуг x20 для телепортации", cat: "resources" as Category, hot: false, new: false },
  { id: 6, name: "Зачарование III", price: 199, oldPrice: null, emoji: "✨", desc: "Случайное зачарование уровня III", cat: "tools" as Category, hot: false, new: true },
  { id: 7, name: "Набор зелий", price: 299, oldPrice: 399, emoji: "🫙", desc: "5 видов зелий x5 — полный комплект", cat: "potions" as Category, hot: true, new: false },
  { id: 8, name: "Нагрудник нижнего", price: 449, oldPrice: null, emoji: "🔥", desc: "Незеритовый нагрудник + зачарование", cat: "armor" as Category, hot: false, new: true },
  { id: 9, name: "Алмазные блоки", price: 349, oldPrice: 499, emoji: "💠", desc: "Алмазные блоки x32 — чистый ресурс", cat: "resources" as Category, hot: false, new: false },
];

export default function PageShop() {
  const [cat, setCat] = useState<Category>("all");
  const [added, setAdded] = useState<number[]>([]);

  const filtered = cat === "all" ? ITEMS : ITEMS.filter((i) => i.cat === cat);

  const handleBuy = (id: number) => {
    setAdded((prev) => [...prev, id]);
    setTimeout(() => setAdded((prev) => prev.filter((x) => x !== id)), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="text-white/30 text-sm font-mono uppercase tracking-widest mb-4">магазин</div>
        <h1 className="text-5xl font-black mb-3">🛒 товары</h1>
        <p className="text-white/40 text-lg">купи снаряжение и ресурсы для игры</p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              cat === c.id
                ? "bg-white text-black border-white"
                : "border-white/15 text-white/60 hover:text-white hover:border-white/40"
            }`}
          >
            <span>{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isAdded = added.includes(item.id);
          return (
            <div
              key={item.id}
              className="group bg-[#161616] border border-white/5 hover:border-white/15 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:bg-[#1a1a1a]"
            >
              {/* Badges */}
              <div className="flex gap-2 min-h-[22px]">
                {item.hot && (
                  <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/20 rounded-full px-2.5 py-0.5 font-medium">
                    🔥 хит
                  </span>
                )}
                {item.new && (
                  <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/20 rounded-full px-2.5 py-0.5 font-medium">
                    ✦ новинка
                  </span>
                )}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-[#111] rounded-xl flex items-center justify-center text-3xl border border-white/5 group-hover:border-white/10 transition-colors">
                {item.emoji}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-bold text-white text-base mb-1">{item.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>

              {/* Price + Buy */}
              <div className="flex items-center justify-between mt-1">
                <div>
                  <span className="text-xl font-black text-white">{item.price}₽</span>
                  {item.oldPrice && (
                    <span className="text-sm text-white/25 line-through ml-2">{item.oldPrice}₽</span>
                  )}
                </div>
                <button
                  onClick={() => handleBuy(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    isAdded
                      ? "bg-green-500 text-white"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {isAdded ? "✓ куплено" : "купить"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div className="mt-10 p-5 bg-[#161616] border border-white/5 rounded-2xl flex gap-4 items-start">
        <span className="text-2xl shrink-0">💡</span>
        <div>
          <div className="font-semibold mb-1">как получить товар?</div>
          <div className="text-white/40 text-sm leading-relaxed">
            после оплаты товар автоматически выдаётся на сервере при следующем заходе. если возникли вопросы — обращайтесь в Discord или через форму контактов.
          </div>
        </div>
      </div>
    </div>
  );
}
