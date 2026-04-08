import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/e489881b-d6ee-4e90-a780-d18a3d49e31e/files/b404153e-73f0-4bfc-916b-f2a601865ae0.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "status", label: "Статус" },
  { id: "rules", label: "Правила" },
  { id: "rating", label: "Рейтинг" },
  { id: "news", label: "Новости" },
];

const RULES = [
  { icon: "🚫", title: "Читы запрещены", desc: "Использование любых читов, модов, дающих преимущество — бан навсегда." },
  { icon: "🤝", title: "Уважай игроков", desc: "Оскорбления, токсичность и харассмент строго наказываются." },
  { icon: "🏗️", title: "Гриферство", desc: "Разрушение чужих построек без разрешения — кик или бан." },
  { icon: "💬", title: "Спам в чате", desc: "Флуд, спам ссылками и реклама других серверов запрещены." },
  { icon: "🔇", title: "Никнеймы", desc: "Никнеймы с оскорбительным содержанием не допускаются." },
  { icon: "⚔️", title: "PvP зоны", desc: "PvP разрешён только в специально отведённых зонах." },
];

const PLAYERS = [
  { rank: 1, name: "DiamondKing", kills: 2841, playtime: "312ч", level: 99, skin: "💎" },
  { rank: 2, name: "SteveMaster", kills: 2203, playtime: "287ч", level: 87, skin: "⚔️" },
  { rank: 3, name: "CreeperSlayer", kills: 1987, playtime: "241ч", level: 76, skin: "🏹" },
  { rank: 4, name: "BuilderPro", kills: 1654, playtime: "198ч", level: 65, skin: "🏗️" },
  { rank: 5, name: "NightWalker", kills: 1432, playtime: "176ч", level: 58, skin: "🌙" },
  { rank: 6, name: "GoldMiner99", kills: 1287, playtime: "154ч", level: 51, skin: "⛏️" },
  { rank: 7, name: "EnderDragon", kills: 1102, playtime: "132ч", level: 44, skin: "🐉" },
  { rank: 8, name: "RedstoneWiz", kills: 987, playtime: "119ч", level: 38, skin: "🔴" },
];

const NEWS = [
  {
    date: "08.04.2026",
    tag: "ОБНОВЛЕНИЕ",
    tagColor: "#5a9e32",
    title: "Версия 1.21 — Новые биомы!",
    desc: "Добавлены 3 новых биома, новые мобы и уникальные блоки. Исследуй неизведанные земли!",
    icon: "🌍",
  },
  {
    date: "01.04.2026",
    tag: "СОБЫТИЕ",
    tagColor: "#f5c842",
    title: "Пасхальный Ивент 🐣",
    desc: "Ищи спрятанные пасхальные яйца по всему миру. Призы: кристаллы, скины, привилегии!",
    icon: "🐣",
  },
  {
    date: "25.03.2026",
    tag: "АНОНС",
    tagColor: "#5ee7f0",
    title: "Турнир по PvP — апрель",
    desc: "Регистрация открыта! Призовой фонд — 5000 кристаллов и уникальные звания.",
    icon: "🏆",
  },
  {
    date: "15.03.2026",
    tag: "СЕРВЕР",
    tagColor: "#c0c0c0",
    title: "Переезд на новое железо",
    desc: "Мощный апгрейд сервера: 64 GB RAM, SSD NVMe. TPS стабильно 20, лагов нет!",
    icon: "⚡",
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [onlinePlayers] = useState(247);
  const [maxPlayers] = useState(500);
  const [tps] = useState(19.8);
  const [serverOnline] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((i) => i.id);
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const rankStyle = (rank: number) => {
    if (rank === 1) return "player-rank-1 pixel-border border-[#f5c842]";
    if (rank === 2) return "player-rank-2 pixel-border border-[#c0c0c0]";
    if (rank === 3) return "player-rank-3 pixel-border border-[#cd7f32]";
    return "pixel-border border-[#2d5a1b]";
  };

  return (
    <div className="min-h-screen bg-[#111a11] text-[#e8f0e0]" style={{ fontFamily: "Rubik, sans-serif" }}>

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d150d]/95 backdrop-blur-sm border-b-4 border-[#2d5a1b]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-float inline-block">⛏️</span>
            <span className="mc-font text-[#5a9e32] text-xs md:text-sm tracking-wide">CraftWorld</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 mc-font text-[9px] transition-all duration-150 ${
                  activeSection === item.id
                    ? "bg-[#5a9e32] text-white"
                    : "text-[#9ab890] hover:text-white hover:bg-[#2d5a1b]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="status-dot"></span>
            <span className="mc-font text-[8px] text-[#5a9e32]">{onlinePlayers} онлайн</span>
          </div>

          <button className="md:hidden text-[#5a9e32]" onClick={() => setMobileMenu(!mobileMenu)}>
            <Icon name="Menu" size={24} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-[#0d150d] border-t-4 border-[#2d5a1b] p-4 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="mc-font text-[9px] text-left px-4 py-3 text-[#9ab890] hover:text-white hover:bg-[#2d5a1b] w-full"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d150d]/80 via-[#0d150d]/60 to-[#111a11]" />

        {/* Floating emojis */}
        {[
          { emoji: "🌲", style: { top: "20%", left: "5%" } },
          { emoji: "⛏️", style: { top: "35%", right: "8%", animationDelay: "1s" } },
          { emoji: "💎", style: { top: "60%", left: "12%", animationDelay: "0.5s" } },
          { emoji: "🧱", style: { top: "25%", right: "20%", animationDelay: "1.5s" } },
          { emoji: "🪨", style: { bottom: "28%", left: "22%", animationDelay: "0.8s" } },
        ].map((b, i) => (
          <span
            key={i}
            className="absolute text-3xl opacity-20 select-none pointer-events-none animate-float"
            style={b.style as React.CSSProperties}
          >
            {b.emoji}
          </span>
        ))}

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="text-7xl md:text-9xl animate-float inline-block">⛏️</span>
          </div>
          <h1
            className="mc-font text-2xl md:text-4xl lg:text-5xl text-[#5a9e32] mb-4 leading-tight"
            style={{ textShadow: "4px 4px 0px #1a3a0a, -2px -2px 0px rgba(0,0,0,0.5)" }}
          >
            CRAFTWORLD
          </h1>
          <p
            className="mc-font text-xs md:text-sm text-[#f5c842] mb-2"
            style={{ textShadow: "2px 2px 0px #7a5a0a" }}
          >
            ЛУЧШИЙ ВЫЖИВАЛЬНЫЙ СЕРВЕР
          </p>
          <p className="text-[#9ab890] text-lg md:text-xl mb-8 max-w-lg mx-auto font-medium">
            Строй, воюй, побеждай. Присоединись к тысячам игроков в эпическом мире!
          </p>

          <div className="inline-block pixel-border-green bg-[#0d1f0d] px-6 py-3 mb-8">
            <p className="mc-font text-[9px] text-[#9ab890] mb-1">АДРЕС СЕРВЕРА</p>
            <p className="mc-font text-[#5a9e32] text-sm md:text-base tracking-wider">play.craftworld.ru</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="mc-btn text-white px-8 py-4 text-[10px]">
              ⚔️ Начать играть
            </button>
            <button onClick={() => scrollTo("status")} className="mc-btn mc-btn-gold text-black px-8 py-4 text-[10px]">
              📊 Статус сервера
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { label: "Игроков онлайн", value: onlinePlayers, icon: "👥" },
              { label: "TPS", value: tps, icon: "⚡" },
              { label: "Дней работы", value: "842", icon: "📅" },
            ].map((stat) => (
              <div key={stat.label} className="pixel-border-green bg-[#0d1f0d]/80 p-3 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="mc-font text-[#5a9e32] text-sm font-bold">{stat.value}</div>
                <div className="text-[#9ab890] text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 grass-block" />
      </section>

      {/* ===== STATUS ===== */}
      <section id="status" className="py-20 px-4 bg-[#0d150d]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="mc-font text-lg md:text-2xl text-[#5a9e32] mb-2"
              style={{ textShadow: "3px 3px 0px #1a3a0a" }}
            >
              📡 СТАТУС СЕРВЕРА
            </h2>
            <p className="text-[#9ab890]">Мониторинг в реальном времени</p>
          </div>

          <div className="pixel-border-green bg-[#111a11] p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{serverOnline ? "🟢" : "🔴"}</span>
                <div>
                  <div className="mc-font text-[#5a9e32] text-sm">
                    {serverOnline ? "СЕРВЕР ОНЛАЙН" : "СЕРВЕР ОФФЛАЙН"}
                  </div>
                  <div className="text-[#9ab890] text-sm mt-1">play.craftworld.ru · Java 1.21</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Онлайн", value: `${onlinePlayers}/${maxPlayers}`, color: "#5a9e32" },
                  { label: "TPS", value: tps.toString(), color: "#5ee7f0" },
                  { label: "Пинг", value: "24ms", color: "#f5c842" },
                  { label: "Аптайм", value: "99.9%", color: "#5a9e32" },
                ].map((s) => (
                  <div key={s.label} className="text-center pixel-border border-[#2d5a1b] bg-[#0d150d] px-4 py-3">
                    <div className="mc-font text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-[#9ab890] text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pixel-border border-[#2d5a1b] bg-[#111a11] p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="mc-font text-[10px] text-[#9ab890]">👥 ЗАПОЛНЕННОСТЬ</span>
              <span className="mc-font text-[10px] text-[#5a9e32]">{onlinePlayers}/{maxPlayers}</span>
            </div>
            <div className="h-6 bg-[#0d150d] border-2 border-[#2d5a1b] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#5a9e32] to-[#7ac943] transition-all duration-500"
                style={{ width: `${(onlinePlayers / maxPlayers) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Выживание", mode: "Survival", players: 124, max: 200, icon: "🌲" },
              { name: "Анархия", mode: "Anarchy", players: 87, max: 150, icon: "💀" },
              { name: "Мини-игры", mode: "Minigames", players: 36, max: 100, icon: "🎮" },
            ].map((srv) => (
              <div key={srv.name} className="pixel-border border-[#2d5a1b] bg-[#111a11] p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{srv.icon}</span>
                  <div>
                    <div className="mc-font text-[10px] text-[#e8f0e0]">{srv.name}</div>
                    <div className="text-[#9ab890] text-xs">{srv.mode}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="status-dot inline-block"></span>
                  </div>
                </div>
                <div className="xp-bar">
                  <div className="xp-bar-fill" style={{ width: `${(srv.players / srv.max) * 100}%` }} />
                </div>
                <div className="mt-2 mc-font text-[8px] text-[#9ab890] text-right">
                  {srv.players}/{srv.max}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RULES ===== */}
      <section id="rules" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="mc-font text-lg md:text-2xl text-[#f5c842] mb-2"
              style={{ textShadow: "3px 3px 0px #7a5a0a" }}
            >
              📜 ПРАВИЛА СЕРВЕРА
            </h2>
            <p className="text-[#9ab890]">Соблюдай правила — играй честно!</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RULES.map((rule, i) => (
              <div
                key={i}
                className="pixel-border border-[#2d5a1b] bg-[#0d150d] p-6 hover:border-[#5a9e32] transition-all duration-200 group"
              >
                <div className="text-4xl mb-3">{rule.icon}</div>
                <h3 className="mc-font text-[10px] text-[#e8f0e0] mb-2 group-hover:text-[#5a9e32] transition-colors">
                  {rule.title}
                </h3>
                <p className="text-[#9ab890] text-sm leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pixel-border-gold bg-[#1a1500] p-6 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="mc-font text-[10px] text-[#f5c842] mt-2 mb-1">ВАЖНО</p>
            <p className="text-[#9ab890] text-sm">
              Незнание правил не освобождает от ответственности. Администрация вправе блокировать без предупреждения за грубые нарушения.
            </p>
          </div>
        </div>
      </section>

      {/* ===== RATING ===== */}
      <section id="rating" className="py-20 px-4 bg-[#0d150d]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="mc-font text-lg md:text-2xl text-[#f5c842] mb-2"
              style={{ textShadow: "3px 3px 0px #7a5a0a" }}
            >
              🏆 РЕЙТИНГ ИГРОКОВ
            </h2>
            <p className="text-[#9ab890]">Лучшие воины CraftWorld</p>
          </div>

          <div className="space-y-3">
            {PLAYERS.map((player, i) => (
              <div
                key={player.rank}
                className={`${rankStyle(player.rank)} bg-[#111a11] p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.01]`}
              >
                <div className="w-10 text-center">
                  {player.rank === 1 && <span className="text-2xl">👑</span>}
                  {player.rank === 2 && <span className="text-2xl">🥈</span>}
                  {player.rank === 3 && <span className="text-2xl">🥉</span>}
                  {player.rank > 3 && (
                    <span className="mc-font text-[10px] text-[#9ab890]">#{player.rank}</span>
                  )}
                </div>

                <div className="text-3xl w-10 text-center">{player.skin}</div>

                <div className="flex-1 min-w-0">
                  <div className="mc-font text-[10px] text-[#e8f0e0] truncate">{player.name}</div>
                  <div className="text-[#9ab890] text-xs mt-0.5">Уровень {player.level}</div>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-right">
                  <div>
                    <div className="mc-font text-[9px] text-[#ff4444]">{player.kills}</div>
                    <div className="text-[#9ab890] text-xs">убийств</div>
                  </div>
                  <div>
                    <div className="mc-font text-[9px] text-[#5ee7f0]">{player.playtime}</div>
                    <div className="text-[#9ab890] text-xs">наиграно</div>
                  </div>
                </div>

                <div className="hidden md:block w-24">
                  <div className="xp-bar">
                    <div className="xp-bar-fill" style={{ width: `${(player.level / 99) * 100}%` }} />
                  </div>
                  <div className="mc-font text-[7px] text-[#9ab890] mt-1 text-right">LVL {player.level}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="mc-btn px-8 py-3">
              📊 Смотреть полный рейтинг
            </button>
          </div>
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section id="news" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="mc-font text-lg md:text-2xl text-[#5ee7f0] mb-2"
              style={{ textShadow: "3px 3px 0px #0a4a55" }}
            >
              📰 НОВОСТИ И СОБЫТИЯ
            </h2>
            <p className="text-[#9ab890]">Обновления, анонсы и события сервера</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {NEWS.map((item, i) => (
              <div
                key={i}
                className="pixel-border border-[#2d5a1b] bg-[#0d150d] p-6 hover:border-[#5a9e32] transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className="mc-font text-[8px] px-2 py-1 inline-block"
                        style={{
                          background: item.tagColor + "22",
                          color: item.tagColor,
                          border: `2px solid ${item.tagColor}`,
                        }}
                      >
                        {item.tag}
                      </span>
                      <span className="text-[#9ab890] text-xs">{item.date}</span>
                    </div>
                    <h3 className="mc-font text-[10px] text-[#e8f0e0] mb-2 group-hover:text-[#5a9e32] transition-colors leading-relaxed">
                      {item.title}
                    </h3>
                    <p className="text-[#9ab890] text-sm leading-relaxed">{item.desc}</p>
                    <button className="mt-3 mc-font text-[8px] text-[#5a9e32] hover:text-[#7ac943] transition-colors">
                      Читать далее →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0a0f0a] border-t-4 border-[#2d5a1b] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">⛏️</span>
                <span className="mc-font text-[#5a9e32] text-sm">CraftWorld</span>
              </div>
              <p className="text-[#9ab890] text-sm leading-relaxed">
                Лучший выживальный сервер для настоящих игроков. Строй, воюй и побеждай!
              </p>
            </div>

            <div>
              <h4 className="mc-font text-[10px] text-[#e8f0e0] mb-4">НАВИГАЦИЯ</h4>
              <div className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="block text-[#9ab890] text-sm hover:text-[#5a9e32] transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mc-font text-[10px] text-[#e8f0e0] mb-4">АДРЕС СЕРВЕРА</h4>
              <div className="pixel-border-green bg-[#0d1f0d] p-4 mb-4">
                <p className="mc-font text-[#5a9e32] text-sm">play.craftworld.ru</p>
                <p className="text-[#9ab890] text-xs mt-1">Java 1.21 · Bedrock</p>
              </div>
              <div className="flex gap-3">
                {["💬", "📺", "🐦", "📱"].map((icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 text-xl pixel-border border-[#2d5a1b] bg-[#111a11] flex items-center justify-center hover:border-[#5a9e32] transition-colors"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t-2 border-[#2d5a1b] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#9ab890] text-xs">© 2026 CraftWorld. Не является официальным проектом Mojang.</p>
            <div className="flex items-center gap-2">
              <span className="status-dot"></span>
              <span className="mc-font text-[8px] text-[#5a9e32]">СЕРВЕР РАБОТАЕТ</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
