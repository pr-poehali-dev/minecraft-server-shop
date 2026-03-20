import { useState, useEffect } from "react";
import PageHome from "@/components/pages/PageHome";
import PageShop from "@/components/pages/PageShop";
import PageDonate from "@/components/pages/PageDonate";
import PageRules from "@/components/pages/PageRules";
import PageContacts from "@/components/pages/PageContacts";
import PageAbout from "@/components/pages/PageAbout";
import Icon from "@/components/ui/icon";

export type Page = "home" | "about" | "shop" | "donate" | "rules" | "contacts";

const NAV = [
  { id: "home", label: "главная" },
  { id: "about", label: "о сервере" },
  { id: "shop", label: "магазин" },
  { id: "donate", label: "донат" },
  { id: "rules", label: "правила" },
  { id: "contacts", label: "контакты" },
] as const;

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const navigate = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white font-rubik">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#111111]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">⛏️</span>
            <span className="font-bold text-lg tracking-tight text-white">CraftLand</span>
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id as Page)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  page === item.id
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-white/70 hover:text-white hover:border-white/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("shop")}
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors"
            >
              магазин
            </button>
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#161616] border-t border-white/5 px-6 py-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as Page)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    page === item.id
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-white/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate("shop")}
              className="w-full py-2.5 rounded-full bg-white text-black font-bold text-sm"
            >
              магазин
            </button>
          </div>
        )}
      </header>

      <main className="pt-16">
        {page === "home" && <PageHome navigate={navigate} />}
        {page === "about" && <PageAbout navigate={navigate} />}
        {page === "shop" && <PageShop />}
        {page === "donate" && <PageDonate />}
        {page === "rules" && <PageRules />}
        {page === "contacts" && <PageContacts />}
      </main>

      <footer className="border-t border-white/5 bg-[#0d0d0d] py-10 px-6 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⛏️</span>
            <span className="font-bold text-white/80">CraftLand</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/30">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => navigate(n.id as Page)}
                className="hover:text-white/70 transition-colors"
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="text-sm text-white/20">play.craftland.ru</div>
        </div>
      </footer>
    </div>
  );
}
