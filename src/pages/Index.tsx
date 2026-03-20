import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/ab38a02c-8f80-4e9b-8222-cb59c6217a6e/files/0ed20e9d-3a37-4231-9627-23bdf6f9da98.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О сервере" },
  { id: "shop", label: "Магазин" },
  { id: "donate", label: "Донат" },
  { id: "rules", label: "Правила" },
  { id: "contacts", label: "Контакты" },
];

const SHOP_ITEMS = [
  { name: "Набор Шахтёра", price: "149₽", emoji: "⛏️", desc: "Алмазная кирка + факелы x64", hot: false },
  { name: "Зелья силы", price: "99₽", emoji: "🧪", desc: "Зелье силы II x10", hot: true },
  { name: "Сундук ресурсов", price: "249₽", emoji: "📦", desc: "Случайные редкие ресурсы", hot: false },
  { name: "Сет Воина", price: "399₽", emoji: "⚔️", desc: "Алмазная броня + меч", hot: true },
  { name: "Эндер-жемчуг", price: "79₽", emoji: "💎", desc: "Эндер-жемчуг x20", hot: false },
  { name: "Зачарование", price: "199₽", emoji: "✨", desc: "Случайное зачарование III", hot: false },
];

const DONATE_TIERS = [
  {
    name: "VIP",
    price: "299₽/мес",
    color: "#4ade80",
    emoji: "🌿",
    perks: ["Префикс [VIP]", "Дополнительный /home x3", "Доступ к VIP-зонам", "Цветной ник"],
    popular: false,
  },
  {
    name: "ELITE",
    price: "599₽/мес",
    color: "#facc15",
    emoji: "⭐",
    perks: ["Префикс [ELITE]", "Дополнительный /home x10", "Fly в мирном мире", "Кастомный ник", "VIP-зоны"],
    popular: true,
  },
  {
    name: "LEGEND",
    price: "999₽/мес",
    color: "#f97316",
    emoji: "🔥",
    perks: ["Префикс [LEGEND]", "Безлимитные /home", "Fly везде", "God Mode в мирном", "Личный регион"],
    popular: false,
  },
];

const RULES = [
  { num: "01", title: "Уважение", text: "Запрещены оскорбления, дискриминация и токсичное поведение." },
  { num: "02", title: "Читы", text: "Использование читов, макросов и сторонних программ — бан навсегда." },
  { num: "03", title: "Гриферство", text: "Разрушение чужих построек без разрешения — временный бан." },
  { num: "04", title: "Реклама", text: "Запрещена реклама других серверов и сторонних ресурсов." },
  { num: "05", title: "Чат", text: "Флуд, спам и CAPS LOCK — мут на 30 минут." },
  { num: "06", title: "Торговля", text: "Мошенничество при сделках ведёт к вечному бану аккаунта." },
];

const STATS = [
  { label: "Игроков онлайн", value: "247", icon: "Users" },
  { label: "Всего игроков", value: "12,850", icon: "Globe" },
  { label: "Дней работы", value: "1,043", icon: "Clock" },
  { label: "Проданных товаров", value: "8,291", icon: "ShoppingBag" },
];

function PixelBlock({ color = "#4ade80", size = 16 }: { color?: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        imageRendering: "pixelated",
        boxShadow: `inset -${size * 0.25}px -${size * 0.25}px 0 rgba(0,0,0,0.3), inset ${size * 0.125}px ${size * 0.125}px 0 rgba(255,255,255,0.2)`,
        flexShrink: 0,
      }}
    />
  );
}

function FloatingBlocks() {
  const blocks = [
    { color: "#4ade80", size: 20, top: "15%", left: "5%", delay: "0s" },
    { color: "#facc15", size: 14, top: "25%", left: "92%", delay: "0.5s" },
    { color: "#60a5fa", size: 18, top: "70%", left: "3%", delay: "1s" },
    { color: "#f97316", size: 12, top: "60%", left: "95%", delay: "1.5s" },
    { color: "#a78bfa", size: 16, top: "40%", left: "90%", delay: "2s" },
    { color: "#fb7185", size: 10, top: "80%", left: "8%", delay: "0.8s" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {blocks.map((b, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{ top: b.top, left: b.left, animationDelay: b.delay }}
        >
          <PixelBlock color={b.color} size={b.size} />
        </div>
      ))}
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", nick: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setContactForm({ name: "", nick: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white font-rubik overflow-x-hidden">
      <FloatingBlocks />

      <div
        className="fixed inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,222,128,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f0a]/90 backdrop-blur-sm border-b-4 border-[#4ade80]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <PixelBlock color="#4ade80" size={10} />
              <PixelBlock color="#22c55e" size={10} />
              <PixelBlock color="#16a34a" size={10} />
            </div>
            <span className="font-pixel text-[#4ade80] text-xs tracking-wider">CRAFTLAND</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 font-pixel text-[9px] transition-all duration-200 border-2 ${
                  activeSection === item.id
                    ? "border-[#4ade80] text-[#4ade80] bg-[#4ade80]/10"
                    : "border-transparent text-gray-400 hover:text-[#4ade80] hover:border-[#4ade80]/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-[#4ade80]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0d150d] border-t-2 border-[#4ade80]/30 px-4 py-3 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-pixel text-[9px] text-left py-2 text-gray-300 hover:text-[#4ade80] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)",
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0a0f0a]/50 to-[#0a0f0a]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 mb-6">
            {["🟩", "🟫", "🪨", "🪵", "💎"].map((e, i) => (
              <span key={i} className="text-2xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                {e}
              </span>
            ))}
          </div>

          <h1
            className="font-pixel text-3xl md:text-5xl text-[#4ade80] mb-4 leading-relaxed animate-fade-in"
            style={{ textShadow: "0 0 30px rgba(74,222,128,0.5), 4px 4px 0 #052005" }}
          >
            CRAFTLAND
          </h1>
          <p className="font-pixel text-xs md:text-sm text-[#facc15] mb-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            ✦ ЛУЧШИЙ SURVIVAL СЕРВЕР ✦
          </p>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in font-rubik" style={{ animationDelay: "0.4s" }}>
            Строй, торгуй, выживай — вместе с тысячами игроков на нашем сервере
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-[#4ade80] translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              <button
                onClick={() => scrollTo("shop")}
                className="relative bg-[#16a34a] border-2 border-[#4ade80] text-white font-pixel text-[10px] px-8 py-4 hover:bg-[#15803d] transition-colors"
              >
                🛒 МАГАЗИН
              </button>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-[#facc15] translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              <button
                onClick={() => scrollTo("donate")}
                className="relative bg-[#854d0e] border-2 border-[#facc15] text-[#facc15] font-pixel text-[10px] px-8 py-4 hover:bg-[#713f12] transition-colors"
              >
                ⭐ ДОНАТ
              </button>
            </div>
          </div>

          <div className="font-pixel text-[#4ade80] text-xs flex items-center justify-center gap-2">
            <span className="animate-blink">█</span>
            <span>play.craftland.ru</span>
            <span className="animate-blink" style={{ animationDelay: "0.5s" }}>█</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-12 bg-[#0d150d] border-y-4 border-[#4ade80]/30">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-[#4ade80]/40 mb-3 group-hover:border-[#4ade80] transition-colors bg-[#4ade80]/5">
                <Icon name={s.icon as "Users"} size={20} className="text-[#4ade80]" />
              </div>
              <div className="font-pixel text-xl text-[#facc15]">{s.value}</div>
              <div className="text-gray-400 text-xs mt-1 font-rubik">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-20 px-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex gap-1">
            <PixelBlock color="#4ade80" size={14} />
            <PixelBlock color="#22c55e" size={14} />
          </div>
          <h2 className="font-pixel text-lg text-[#4ade80]">О СЕРВЕРЕ</h2>
          <div className="flex-1 border-t-2 border-[#4ade80]/20" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-rubik">
              <span className="text-[#4ade80] font-bold">CraftLand</span> — это место, где каждый найдёт своё приключение.
              Survival с экономикой, кланами и уникальными ивентами каждую неделю.
            </p>
            <div className="space-y-4">
              {[
                { emoji: "🏰", text: "Собственные регионы и защита от гриферов" },
                { emoji: "💰", text: "Игровая экономика с аукционом и магазинами" },
                { emoji: "⚔️", text: "PvP-арены и еженедельные турниры" },
                { emoji: "🎉", text: "Ивенты каждые выходные с призами" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#0d150d] border border-[#4ade80]/20 p-3">
                  <span className="text-2xl">{f.emoji}</span>
                  <span className="text-gray-300 font-rubik">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Версия", value: "1.20.4", color: "#4ade80" },
              { label: "Режим", value: "Survival", color: "#facc15" },
              { label: "Слоты", value: "500", color: "#60a5fa" },
              { label: "Аптайм", value: "99.9%", color: "#f97316" },
            ].map((s, i) => (
              <div key={i} className="bg-[#0d150d] border-2 p-4 text-center" style={{ borderColor: s.color + "40" }}>
                <div className="font-pixel text-sm mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-gray-400 text-xs font-rubik">{s.label}</div>
              </div>
            ))}
            <div className="col-span-2 bg-[#0d150d] border-2 border-[#4ade80]/20 p-4 text-center">
              <div className="font-pixel text-[9px] text-gray-500 mb-1">ПОПУЛЯРНЫЙ ТОВАР НЕДЕЛИ</div>
              <div className="text-2xl mb-1">⚔️</div>
              <div className="font-rubik font-bold text-[#facc15]">Сет Воина</div>
              <div className="text-gray-400 text-xs">куплено 312 раз</div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="relative z-10 py-20 px-4 bg-[#0a0d0a]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="flex gap-1">
              <PixelBlock color="#facc15" size={14} />
              <PixelBlock color="#eab308" size={14} />
            </div>
            <h2 className="font-pixel text-lg text-[#facc15]">МАГАЗИН</h2>
            <div className="flex-1 border-t-2 border-[#facc15]/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SHOP_ITEMS.map((item, i) => (
              <div
                key={i}
                className="relative bg-[#0d150d] border-2 border-[#4ade80]/20 hover:border-[#4ade80] transition-all duration-300 group overflow-hidden"
              >
                {item.hot && (
                  <div className="absolute top-0 right-0 bg-[#ef4444] font-pixel text-[8px] px-2 py-1 text-white">
                    🔥 ХИТ
                  </div>
                )}
                <div className="p-5">
                  <div className="w-16 h-16 flex items-center justify-center text-3xl mb-4 border-2 border-[#4ade80]/20 group-hover:border-[#4ade80]/60 transition-colors">
                    {item.emoji}
                  </div>
                  <h3 className="font-pixel text-[10px] text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 font-rubik">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-[#facc15] text-sm">{item.price}</span>
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#4ade80] translate-x-0.5 translate-y-0.5" />
                      <button className="relative bg-[#16a34a] border border-[#4ade80] text-white font-pixel text-[8px] px-3 py-2 hover:bg-[#15803d] transition-colors">
                        КУПИТЬ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-1">
              <PixelBlock color="#f97316" size={14} />
              <PixelBlock color="#ea580c" size={14} />
            </div>
            <h2 className="font-pixel text-lg text-[#f97316]">ДОНАТ</h2>
            <div className="flex-1 border-t-2 border-[#f97316]/20" />
          </div>
          <p className="text-gray-400 font-rubik mb-12">Поддержи сервер и получи привилегии</p>

          <div className="grid md:grid-cols-3 gap-6">
            {DONATE_TIERS.map((tier, i) => (
              <div
                key={i}
                className={`relative bg-[#0d150d] border-2 p-6 transition-all duration-300 hover:scale-[1.02] ${tier.popular ? "scale-[1.03]" : ""}`}
                style={{ borderColor: tier.color + "60" }}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 font-pixel text-[8px] px-3 py-1 bg-[#0a0f0a] border-2"
                    style={{ color: tier.color, borderColor: tier.color }}
                  >
                    ★ POPULAR
                  </div>
                )}
                <div className="text-4xl mb-3">{tier.emoji}</div>
                <h3 className="font-pixel text-lg mb-1" style={{ color: tier.color }}>
                  {tier.name}
                </h3>
                <div className="font-pixel text-2xl text-white mb-5">{tier.price}</div>
                <ul className="space-y-2 mb-6">
                  {tier.perks.map((p, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300 text-sm font-rubik">
                      <span style={{ color: tier.color }}>▶</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="relative group">
                  <div className="absolute inset-0 translate-x-1 translate-y-1" style={{ backgroundColor: tier.color }} />
                  <button
                    className="relative w-full border-2 font-pixel text-[9px] py-3 transition-colors"
                    style={{
                      borderColor: tier.color,
                      backgroundColor: tier.color + "20",
                      color: tier.color,
                    }}
                  >
                    КУПИТЬ {tier.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RULES */}
      <section id="rules" className="relative z-10 py-20 px-4 bg-[#0a0d0a]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="flex gap-1">
              <PixelBlock color="#60a5fa" size={14} />
              <PixelBlock color="#3b82f6" size={14} />
            </div>
            <h2 className="font-pixel text-lg text-[#60a5fa]">ПРАВИЛА</h2>
            <div className="flex-1 border-t-2 border-[#60a5fa]/20" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {RULES.map((rule, i) => (
              <div
                key={i}
                className="flex gap-4 bg-[#0d150d] border border-[#60a5fa]/20 hover:border-[#60a5fa]/50 p-4 transition-colors"
              >
                <span className="font-pixel text-[#60a5fa]/30 text-lg flex-shrink-0">{rule.num}</span>
                <div>
                  <h3 className="font-pixel text-[10px] text-[#60a5fa] mb-2">{rule.title}</h3>
                  <p className="text-gray-400 text-sm font-rubik">{rule.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#1a0808] border-2 border-[#ef4444]/30 p-4 flex gap-3">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <p className="text-gray-300 text-sm font-rubik">
              <span className="text-[#ef4444] font-bold">Важно:</span> За нарушение правил следует предупреждение, мут, кик или бан в зависимости от тяжести.
              Администрация оставляет право на дополнение правил.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-1">
              <PixelBlock color="#a78bfa" size={14} />
              <PixelBlock color="#8b5cf6" size={14} />
            </div>
            <h2 className="font-pixel text-lg text-[#a78bfa]">КОНТАКТЫ</h2>
            <div className="flex-1 border-t-2 border-[#a78bfa]/20" />
          </div>
          <p className="text-gray-400 font-rubik mb-12">Есть вопрос или предложение? Напишите нам!</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: "MessageCircle", label: "Discord", value: "discord.gg/craftland", color: "#a78bfa" },
                { icon: "Send", label: "Telegram", value: "@craftland_server", color: "#60a5fa" },
                { icon: "Mail", label: "Email", value: "admin@craftland.ru", color: "#4ade80" },
                { icon: "Server", label: "IP Сервера", value: "play.craftland.ru", color: "#facc15" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 bg-[#0d150d] border border-[#a78bfa]/20 p-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center border"
                    style={{ borderColor: c.color + "40", backgroundColor: c.color + "10" }}
                  >
                    <Icon name={c.icon as "Mail"} size={18} style={{ color: c.color }} />
                  </div>
                  <div>
                    <div className="font-pixel text-[8px] text-gray-500 mb-1">{c.label}</div>
                    <div className="font-rubik text-white">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleContact} className="space-y-4">
              <div>
                <label className="font-pixel text-[8px] text-gray-500 block mb-2">ВАШ НИК В МАЙНКРАФТ</label>
                <input
                  type="text"
                  placeholder="Steve"
                  value={contactForm.nick}
                  onChange={(e) => setContactForm({ ...contactForm, nick: e.target.value })}
                  required
                  className="w-full bg-[#0d150d] border-2 border-[#a78bfa]/30 focus:border-[#a78bfa] text-white px-4 py-3 font-rubik outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-pixel text-[8px] text-gray-500 block mb-2">ВАШ DISCORD / EMAIL</label>
                <input
                  type="text"
                  placeholder="user#0000 или mail@example.com"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className="w-full bg-[#0d150d] border-2 border-[#a78bfa]/30 focus:border-[#a78bfa] text-white px-4 py-3 font-rubik outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-pixel text-[8px] text-gray-500 block mb-2">СООБЩЕНИЕ</label>
                <textarea
                  placeholder="Опишите ваш вопрос..."
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  className="w-full bg-[#0d150d] border-2 border-[#a78bfa]/30 focus:border-[#a78bfa] text-white px-4 py-3 font-rubik outline-none transition-colors resize-none"
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-[#a78bfa] translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                <button
                  type="submit"
                  disabled={sending || sent}
                  className="relative w-full bg-[#5b21b6] border-2 border-[#a78bfa] text-white font-pixel text-[9px] py-4 hover:bg-[#4c1d95] transition-colors disabled:opacity-60"
                >
                  {sent ? "✓ ОТПРАВЛЕНО!" : sending ? "ОТПРАВЛЯЮ..." : "📨 ОТПРАВИТЬ ЗАЯВКУ"}
                </button>
              </div>
              {sent && (
                <p className="text-[#4ade80] font-pixel text-[8px] text-center animate-fade-in">
                  Ваша заявка принята! Ответим в Discord.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t-4 border-[#4ade80]/20 bg-[#050905] py-8 px-4 text-center">
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <PixelBlock
              key={i}
              color={["#4ade80", "#22c55e", "#16a34a", "#15803d"][i % 4]}
              size={12}
            />
          ))}
        </div>
        <div className="font-pixel text-[#4ade80] text-[10px] mb-2">CRAFTLAND © 2024</div>
        <div className="text-gray-600 text-xs font-rubik">play.craftland.ru • Версия 1.20.4</div>
      </footer>
    </div>
  );
}
