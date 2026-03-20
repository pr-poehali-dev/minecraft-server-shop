import { useState } from "react";

type Category = "all" | "tools" | "armor" | "potions" | "resources";

const SBP_URL = "https://functions.poehali.dev/70a06a85-34af-48e9-8608-af74936e4323";

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

type BuyModalProps = {
  item: typeof ITEMS[0];
  onClose: () => void;
};

function BuyModal({ item, onClose }: BuyModalProps) {
  const [nick, setNick] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    if (!nick.trim()) {
      setError("Введите ник в Minecraft");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch(SBP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: item.price,
          description: `${item.name} — KLEVER сервер`,
          nick: nick.trim(),
          return_url: window.location.href,
        }),
      });
      const data = await res.json();
      if (data.confirmation_url) {
        window.location.href = data.confirmation_url;
      } else {
        setError(data.error || "Ошибка оплаты, попробуйте позже");
      }
    } catch {
      setError("Ошибка соединения, попробуйте позже");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-7 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#111] rounded-xl flex items-center justify-center text-2xl border border-white/5">
              {item.emoji}
            </div>
            <div>
              <div className="font-bold text-white">{item.name}</div>
              <div className="text-white/40 text-sm">{item.desc}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors text-xl leading-none">×</button>
        </div>

        {/* Price */}
        <div className="bg-[#111] rounded-2xl p-4 mb-5 flex items-center justify-between">
          <span className="text-white/50 text-sm">к оплате</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{item.price}₽</span>
            {item.oldPrice && (
              <span className="text-white/25 line-through text-sm">{item.oldPrice}₽</span>
            )}
          </div>
        </div>

        {/* Nick input */}
        <div className="mb-4">
          <label className="text-xs text-white/30 block mb-2 uppercase tracking-wide">Ваш ник в Minecraft</label>
          <input
            type="text"
            placeholder="Steve"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            className="w-full bg-[#111] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
          />
          <p className="text-white/25 text-xs mt-1.5">товар будет выдан именно этому игроку</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* SBP Pay button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#1DA462"/>
                <path d="M12 4L16.5 8.5H13.5V13.5H10.5V8.5H7.5L12 4Z" fill="white"/>
                <path d="M7 16H17V18H7V16Z" fill="white"/>
              </svg>
              Оплатить через СБП
            </>
          )}
        </button>

        <p className="text-center text-white/25 text-xs mt-3">
          оплата через Систему быстрых платежей — без комиссии
        </p>
      </div>
    </div>
  );
}

export default function PageShop() {
  const [cat, setCat] = useState<Category>("all");
  const [buyItem, setBuyItem] = useState<typeof ITEMS[0] | null>(null);

  const filtered = cat === "all" ? ITEMS : ITEMS.filter((i) => i.cat === cat);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {buyItem && <BuyModal item={buyItem} onClose={() => setBuyItem(null)} />}

      {/* Header */}
      <div className="mb-10">
        <div className="text-white/30 text-sm font-mono uppercase tracking-widest mb-4">магазин</div>
        <h1 className="text-5xl font-black mb-3">🛒 товары</h1>
        <p className="text-white/40 text-lg">купи снаряжение и ресурсы для игры</p>
      </div>

      {/* SBP badge */}
      <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-green-400 text-sm font-medium mb-8">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#1DA462"/>
          <path d="M12 4L16.5 8.5H13.5V13.5H10.5V8.5H7.5L12 4Z" fill="white"/>
          <path d="M7 16H17V18H7V16Z" fill="white"/>
        </svg>
        Оплата через СБП — мгновенно, без комиссии
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
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-[#161616] border border-white/5 hover:border-white/15 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:bg-[#1a1a1a]"
          >
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

            <div className="w-14 h-14 bg-[#111] rounded-xl flex items-center justify-center text-3xl border border-white/5 group-hover:border-white/10 transition-colors">
              {item.emoji}
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-white text-base mb-1">{item.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div>
                <span className="text-xl font-black text-white">{item.price}₽</span>
                {item.oldPrice && (
                  <span className="text-sm text-white/25 line-through ml-2">{item.oldPrice}₽</span>
                )}
              </div>
              <button
                onClick={() => setBuyItem(item)}
                className="px-4 py-2 rounded-full text-sm font-bold bg-white text-black hover:bg-white/90 transition-all duration-200 flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="#1DA462"/>
                  <path d="M12 4L16.5 8.5H13.5V13.5H10.5V8.5H7.5L12 4Z" fill="white"/>
                  <path d="M7 16H17V18H7V16Z" fill="white"/>
                </svg>
                купить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 bg-[#161616] border border-white/5 rounded-2xl flex gap-4 items-start">
        <span className="text-2xl shrink-0">💡</span>
        <div>
          <div className="font-semibold mb-1">как получить товар?</div>
          <div className="text-white/40 text-sm leading-relaxed">
            после оплаты через СБП товар автоматически выдаётся на сервере при следующем заходе. если возникли вопросы — обращайтесь в Discord.
          </div>
        </div>
      </div>
    </div>
  );
}
