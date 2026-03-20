import { type Page } from "@/pages/Index";

const GROUP_IMG = "https://cdn.poehali.dev/projects/ab38a02c-8f80-4e9b-8222-cb59c6217a6e/files/9bdf9f4a-e7b6-4694-ab28-acd0af888a0a.jpg";

const TIMELINE = [
  { year: "2021", event: "Основание сервера, первые 50 игроков" },
  { year: "2022", event: "Запуск экономики и системы кланов" },
  { year: "2023", event: "1000+ игроков, первый крупный ивент" },
  { year: "2024", event: "Обновление до 1.20.4, новые биомы и механики" },
];

export default function PageAbout({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero text */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <div className="text-white/30 text-sm font-mono uppercase tracking-widest mb-4">о нас</div>
          <h1 className="text-5xl font-black leading-tight mb-6">
            🏡 наш сервер
          </h1>
          <p className="text-white/50 text-xl leading-relaxed mb-4">
            — это большое и дружелюбное сообщество. у нас идеально себя чувствуют любители ваниллы, ведь мы бережно внедрили новые механики и фишки, которые дополняют игру.
          </p>
          <p className="text-white/40 text-lg leading-relaxed">
            без привилегий, приватов и лишних дополнений — просто честный survival с живой экономикой и отличными людьми рядом.
          </p>
        </div>
        <div className="w-full aspect-square max-w-[360px] mx-auto bg-[#1a1a1a] rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 to-transparent z-10" />
          <img src={GROUP_IMG} alt="Community" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Server specs */}
      <div className="mb-20">
        <h2 className="text-3xl font-black mb-8">технические характеристики</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Версия", value: "1.20.4", sub: "Java Edition" },
            { label: "Режим", value: "Survival", sub: "Hard difficulty" },
            { label: "Слоты", value: "500", sub: "игроков" },
            { label: "Аптайм", value: "99.9%", sub: "за 2024 год" },
            { label: "Хранилище", value: "2 ТБ", sub: "SSD NVMe" },
            { label: "ОЗУ", value: "32 ГБ", sub: "выделено" },
            { label: "TPS", value: "20.0", sub: "стабильно" },
            { label: "Пинг", value: "<10ms", sub: "Москва/СПб" },
          ].map((s, i) => (
            <div key={i} className="bg-[#161616] border border-white/5 rounded-2xl p-5">
              <div className="text-2xl font-black text-white mb-1">{s.value}</div>
              <div className="text-sm font-semibold text-white/70 mb-0.5">{s.label}</div>
              <div className="text-xs text-white/30">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-20">
        <h2 className="text-3xl font-black mb-8">история сервера</h2>
        <div className="space-y-4">
          {TIMELINE.map((t, i) => (
            <div key={i} className="flex gap-6 items-start p-5 bg-[#161616] rounded-2xl border border-white/5">
              <div className="font-mono font-black text-2xl text-white/20 w-16 shrink-0">{t.year}</div>
              <div className="w-px bg-white/10 self-stretch shrink-0" />
              <div className="text-white/70 text-lg pt-1">{t.event}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#161616] border border-white/5 rounded-3xl p-10 text-center">
        <div className="text-4xl mb-4">🚀</div>
        <h2 className="text-3xl font-black mb-3">готов начать?</h2>
        <p className="text-white/40 mb-6">зайди на сервер прямо сейчас</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate("shop")}
            className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-colors"
          >
            открыть магазин
          </button>
          <button
            onClick={() => navigate("contacts")}
            className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
          >
            связаться с нами
          </button>
        </div>
      </div>
    </div>
  );
}
