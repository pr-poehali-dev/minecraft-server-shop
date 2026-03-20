import { type Page } from "@/pages/Index";
import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const SKIN_IMG = "https://cdn.poehali.dev/projects/ab38a02c-8f80-4e9b-8222-cb59c6217a6e/files/f1df1fc6-666e-4814-b8e1-63914c178453.jpg";
const GROUP_IMG = "https://cdn.poehali.dev/projects/ab38a02c-8f80-4e9b-8222-cb59c6217a6e/files/9bdf9f4a-e7b6-4694-ab28-acd0af888a0a.jpg";
const SERVER_STATUS_URL = "https://functions.poehali.dev/22c42b71-135b-4618-bd1c-c9ace834488b";

const FEATURES = [
  { emoji: "🏰", title: "Survival с экономикой", desc: "Торгуй, строй города, развивай своё государство" },
  { emoji: "⚔️", title: "PvP-арены", desc: "Еженедельные турниры с призовым фондом" },
  { emoji: "🗺️", title: "Живая карта", desc: "Онлайн-карта мира в реальном времени" },
  { emoji: "🎉", title: "Ивенты", desc: "Эксклюзивные события каждые выходные" },
  { emoji: "🔒", title: "Защита регионов", desc: "Твои постройки под надёжной защитой" },
  { emoji: "💬", title: "Сообщество", desc: "Дружелюбный Discord с 2000+ участниками" },
];

type ServerStatus = {
  online: boolean;
  players: number;
  max_players: number;
  version: string;
};

export default function PageHome({ navigate }: { navigate: (p: Page) => void }) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(SERVER_STATUS_URL)
      .then((r) => r.json())
      .then((d) => setStatus(d))
      .catch(() => setStatus({ online: false, players: 0, max_players: 0, version: "" }));
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText("185.9.145.187:30043");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playersText = status
    ? status.online
      ? `${status.players} игроков онлайн`
      : "сервер недоступен"
    : "загрузка...";

  const isOnline = status?.online ?? null;

  const STATS = [
    { value: status ? String(status.players) : "...", label: "онлайн сейчас" },
    { value: status ? String(status.max_players) : "...", label: "слотов" },
    { value: "1043", label: "дней работы" },
    { value: "99.9%", label: "аптайм" },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-red-900/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-orange-900/10 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
          <div className="animate-fade-in">
            {/* Live status badge */}
            <div className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-sm mb-6 transition-colors ${
              isOnline === null
                ? "bg-white/5 border-white/10 text-white/50"
                : isOnline
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                isOnline === null ? "bg-white/30" :
                isOnline ? "bg-green-400 animate-pulse" : "bg-red-400"
              }`} />
              {playersText}
              {status?.version && (
                <span className="text-white/30 text-xs ml-1">· {status.version}</span>
              )}
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4 tracking-tight">
              ⛏️ KLEVER —<br />
              <span className="text-white/90">лучший сервер</span>
            </h1>

            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
              погрузитесь в атмосферу выживания с экономикой, кланами и ивентами — сервер, который живёт своей жизнью
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("about")}
                className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors text-sm"
              >
                подробнее
              </button>
              <button
                onClick={() => navigate("shop")}
                className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-colors text-sm"
              >
                открыть магазин
              </button>
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 inline-flex items-center gap-3">
              <div className="w-8 h-8 bg-[#222] rounded-lg flex items-center justify-center">
                <span className="text-sm">🖥️</span>
              </div>
              <div>
                <div className="text-xs text-white/40">IP сервера</div>
                <div className="font-mono font-bold text-sm">185.9.145.187:30043</div>
              </div>
              <button
                className="ml-2 transition-colors"
                onClick={handleCopy}
                title="Копировать"
              >
                {copied
                  ? <span className="text-green-400 text-xs font-semibold">✓</span>
                  : <Icon name="Copy" size={14} className="text-white/30 hover:text-white/70" />
                }
              </button>
            </div>
          </div>

          {/* Right — skin illustration */}
          <div className="relative flex justify-center">
            <div className="w-[320px] h-[380px] bg-[#1a1a1a] rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
              <img
                src={SKIN_IMG}
                alt="Minecraft character"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute bottom-6 -left-4 bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-xs text-white/40 mb-1">версия</div>
              <div className="font-bold text-sm">{status?.version || "1.21.1 Java"}</div>
            </div>
            <div className="absolute top-6 -right-4 bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-xs text-white/40 mb-1">режим</div>
              <div className="font-bold text-sm">⚔️ Survival</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-white/5 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-sm text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <h2 className="text-4xl font-black mb-3">почему KLEVER?</h2>
            <p className="text-white/40 text-lg">всё что нужно для крутой игры — уже здесь</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group p-6 bg-[#161616] rounded-2xl border border-white/5 hover:border-white/15 hover:bg-[#1a1a1a] transition-all duration-300 cursor-default"
              >
                <div className="text-3xl mb-4">{f.emoji}</div>
                <h3 className="font-bold text-lg mb-2 text-white">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-[#161616] rounded-3xl border border-white/5 overflow-hidden p-10 md:p-16 grid md:grid-cols-2 gap-8 items-center">
            <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-red-900/15 blur-[80px] pointer-events-none" />
            <div>
              <h2 className="text-4xl font-black mb-4 leading-tight">
                🏘️ наш дружный<br />сервер ждёт тебя
              </h2>
              <p className="text-white/40 text-lg mb-8 leading-relaxed">
                это большое и дружелюбное сообщество. здесь идеально себя чувствуют любители выживания — бережно внедряем новые механики и фишки
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => navigate("about")}
                  className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors text-sm"
                >
                  узнать больше
                </button>
                <button
                  onClick={() => navigate("donate")}
                  className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-colors text-sm"
                >
                  поддержать сервер
                </button>
              </div>
            </div>
            <div className="relative flex justify-end">
              <div className="w-[260px] h-[260px] bg-[#1e1e1e] rounded-2xl overflow-hidden">
                <img src={GROUP_IMG} alt="Players" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
