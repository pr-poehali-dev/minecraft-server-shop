import { useState } from "react";

const LINKS = [
  { icon: "🎮", label: "Discord-сервер", value: "discord.gg/craftland", sub: "2 400+ участников", href: "#" },
  { icon: "✈️", label: "Telegram", value: "@craftland_server", sub: "Новости и обновления", href: "#" },
  { icon: "📧", label: "Email", value: "admin@craftland.ru", sub: "Ответим за 24 часа", href: "mailto:admin@craftland.ru" },
  { icon: "🖥️", label: "IP сервера", value: "play.craftland.ru", sub: "Версия 1.20.4 Java", href: null },
];

export default function PageContacts() {
  const [form, setForm] = useState({ nick: "", contact: "", topic: "general", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    setForm({ nick: "", contact: "", topic: "general", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="text-white/30 text-sm font-mono uppercase tracking-widest mb-4">связь</div>
        <h1 className="text-5xl font-black mb-3">📬 контакты</h1>
        <p className="text-white/40 text-lg">есть вопрос, предложение или нашли баг? напишите нам</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <h2 className="font-bold text-xl mb-5">где нас найти</h2>
          <div className="space-y-3 mb-10">
            {LINKS.map((l, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-[#161616] border border-white/5 hover:border-white/15 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 bg-[#111] rounded-xl flex items-center justify-center text-xl shrink-0">
                  {l.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/30 mb-0.5">{l.label}</div>
                  {l.href ? (
                    <a
                      href={l.href}
                      className="font-semibold text-white hover:text-white/80 transition-colors truncate block"
                    >
                      {l.value}
                    </a>
                  ) : (
                    <span className="font-semibold text-white truncate block">{l.value}</span>
                  )}
                  <div className="text-xs text-white/30 mt-0.5">{l.sub}</div>
                </div>
                {l.href && (
                  <span className="text-white/20 group-hover:text-white/50 transition-colors text-sm">→</span>
                )}
              </div>
            ))}
          </div>

          {/* Working hours */}
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span>🕐</span> время работы поддержки
            </h3>
            <div className="space-y-2">
              {[
                { day: "Пн–Пт", time: "10:00 – 22:00" },
                { day: "Сб–Вс", time: "12:00 – 20:00" },
              ].map((h, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white/40">{h.day}</span>
                  <span className="font-semibold">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div>
          <h2 className="font-bold text-xl mb-5">отправить заявку</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/30 block mb-1.5">НИК В МАЙНКРАФТ</label>
              <input
                type="text"
                placeholder="Steve"
                value={form.nick}
                onChange={(e) => setForm({ ...form, nick: e.target.value })}
                required
                className="w-full bg-[#161616] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
              />
            </div>

            <div>
              <label className="text-xs text-white/30 block mb-1.5">DISCORD / EMAIL</label>
              <input
                type="text"
                placeholder="user#0000 или mail@example.com"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                required
                className="w-full bg-[#161616] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
              />
            </div>

            <div>
              <label className="text-xs text-white/30 block mb-1.5">ТЕМА ОБРАЩЕНИЯ</label>
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full bg-[#161616] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors appearance-none"
              >
                <option value="general">Общий вопрос</option>
                <option value="bug">Баг-репорт</option>
                <option value="ban">Апелляция по бану</option>
                <option value="shop">Вопрос по покупке</option>
                <option value="suggest">Предложение</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-white/30 block mb-1.5">СООБЩЕНИЕ</label>
              <textarea
                placeholder="Опишите вашу ситуацию подробно..."
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full bg-[#161616] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none placeholder:text-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={sending || sent}
              className={`w-full py-3 rounded-full font-bold text-sm transition-all ${
                sent
                  ? "bg-green-500 text-white"
                  : "bg-white text-black hover:bg-white/90 disabled:opacity-50"
              }`}
            >
              {sent ? "✓ заявка отправлена!" : sending ? "отправляем..." : "отправить заявку"}
            </button>

            {sent && (
              <p className="text-center text-sm text-white/40 animate-fade-in">
                мы ответим в Discord или на указанный email
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
