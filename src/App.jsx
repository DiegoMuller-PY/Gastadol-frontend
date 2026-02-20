import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:         #08090E;
    --surface:    #0F1018;
    --card:       #13141F;
    --card2:      #191A28;
    --border:     rgba(255,255,255,0.06);
    --lime:       #C6FF57;
    --lime-dim:   rgba(198,255,87,0.12);
    --violet:     #8B5CF6;
    --violet-dim: rgba(139,92,246,0.15);
    --cyan:       #22D3EE;
    --rose:       #FB7185;
    --text:       #EEF0FF;
    --muted:      #5A5C7A;
    --muted2:     #8B8DAA;
  }

  html, body {
    width: 100%; height: 100%;
    overflow: hidden;
    overscroll-behavior: none;
  }
  #root {
    width: 100%; height: 100vh;
    background: var(--bg);
    font-family: 'Syne', sans-serif;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--card2); border-radius: 2px; }

  /* SHELL */
  .shell {
    display: grid;
    grid-template-columns: 220px 1fr;
    width: 100%; height: 100vh;
    overflow: hidden; position: relative;
  }

  /* OVERLAY */
  .overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.7); z-index: 40;
    backdrop-filter: blur(2px);
  }
  .overlay.open { display: block; }

  /* SIDEBAR */
  .sidebar {
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 28px 20px;
    display: flex; flex-direction: column; gap: 8px;
    height: 100vh; overflow-y: auto; z-index: 50;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  }
    .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
    padding: 0 8px;
  }

  .logo-mark {
    width: 36px;
    height: 36px;
    background: var(--lime);
    border-radius: 12px;            /* 👈 más moderno */
    display: grid;
    place-items: center;
    font-size: 15px;
    font-weight: 700;               /* 👈 menos pesado */
    color: var(--bg);
    letter-spacing: 0;              /* 👈 quitamos estiramiento */
  }

  .logo-name {
    font-size: 20px;                /* 👈 un poco más grande */
    font-weight: 700;               /* 👈 antes 800 */
    letter-spacing: -0.3px;         /* 👈 menos agresivo */
    line-height: 1.1;
  }

  .logo-name span {
    color: var(--lime);
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px; cursor: pointer;
    font-size: 14px; font-weight: 500; color: var(--muted2);
    transition: all 0.15s; border: 1px solid transparent; user-select: none;
  }
  .nav-item:hover { background: var(--card); color: var(--text); }
  .nav-item.active { background: var(--lime-dim); color: var(--lime); border-color: rgba(198,255,87,0.2); }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-badge {
    margin-left: auto; background: var(--violet); color: #fff;
    font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 20px;
  }
  .sidebar-bottom { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border); }
  .avatar-row {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: background 0.15s;
  }
  .avatar-row:hover { background: var(--card); }
  .avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, var(--violet), var(--cyan));
    display: grid; place-items: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .avatar-info { flex: 1; min-width: 0; }
  .avatar-name { font-size: 13px; font-weight: 600; }
  .avatar-role { font-size: 11px; color: var(--muted); margin-top: 1px; }

  /* MAIN */
  .main { padding: 32px 36px 32px; overflow-y: auto; height: 100vh; }

  /* TOP BAR */
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26px 0;          /* 👈 más altura visual */
    margin-bottom: 32px;
  }

  .topbar-left {
    display: flex;
    align-items: center;
    gap: 18px;                /* 👈 más separación del hamburger */
  }

  .topbar-left h1 {
    font-size: 28px;          /* 👈 más presencia */
    font-weight: 700;         /* 👈 menos pesado que 800 */
    letter-spacing: -0.6px;   /* 👈 menos “apretado” */
    line-height: 1.2;         /* 👈 clave para que no se vea estirado */
    margin: 0;
  }

  .topbar-left p {
    font-size: 14px;
    color: var(--muted2);
    margin-top: 6px;          /* 👈 más aire entre título y fecha */
    letter-spacing: 0.3px;
  }

  .topbar-actions {
    display: flex;
    gap: 14px;                /* 👈 botones menos comprimidos */
    align-items: center;
  }

  .hamburger {
    display: none; width: 38px; height: 38px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 10px; cursor: pointer;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 5px; flex-shrink: 0;
  }
  .hamburger span { display: block; width: 16px; height: 2px; background: var(--muted2); border-radius: 2px; }

  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 18px; border-radius: 10px;
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s; border: none;
  }
  .btn-ghost { background: var(--card); color: var(--muted2); border: 1px solid var(--border); }
  .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.12); }
  .btn-primary { background: var(--lime); color: var(--bg); }
  .btn-primary:hover { background: #d4ff6a; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(198,255,87,0.3); }
  .notif-btn {
    width: 38px; height: 38px; background: var(--card); border: 1px solid var(--border);
    border-radius: 10px; display: grid; place-items: center;
    cursor: pointer; font-size: 16px; color: var(--muted2); transition: all 0.15s; position: relative; flex-shrink: 0;
  }
  .notif-dot {
    position: absolute; top: 7px; right: 7px; width: 7px; height: 7px;
    border-radius: 50%; background: var(--rose); border: 2px solid var(--surface);
  }

  /* HERO CARD */
  .hero-card {
    background: linear-gradient(135deg, #1A1F3A 0%, #0F1228 50%, #0A0C1A 100%);
    border: 1px solid rgba(139,92,246,0.25); border-radius: 20px;
    padding: 32px; margin-bottom: 24px; position: relative; overflow: hidden;
  }
  .hero-card::before {
    content: ''; position: absolute; top: -60px; right: -60px; width: 240px; height: 240px;
    background: radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%); pointer-events: none;
  }
  .hero-card::after {
    content: ''; position: absolute; bottom: -80px; left: 40%; width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(198,255,87,0.08) 0%, transparent 70%); pointer-events: none;
  }
  .hero-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; gap: 16px; }
  .hero-label { font-size: 12px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: var(--muted2); }
  .hero-balance { font-size: 46px; font-weight: 800; letter-spacing: -2px; color: var(--text); font-family: 'DM Mono', monospace; line-height: 1; margin-top: 8px; }
  .hero-balance span { color: var(--lime); }
  .hero-change { display: inline-flex; align-items: center; gap: 4px; background: rgba(198,255,87,0.12); color: var(--lime); border-radius: 6px; font-size: 12px; font-weight: 600; padding: 4px 8px; margin-top: 10px; }
  .hero-chips { display: flex; gap: 12px; flex-wrap: wrap; }
  .chip { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 10px; padding: 10px 16px; flex: 1; min-width: 120px; }
  .chip-icon { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; font-size: 13px; }
  .chip-icon.income { background: rgba(198,255,87,0.15); }
  .chip-icon.spend  { background: rgba(251,113,133,0.15); }
  .chip-label { font-size: 11px; color: var(--muted2); }
  .chip-value { font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; margin-top: 1px; }
  .chip-value.income { color: var(--lime); }
  .chip-value.spend  { color: var(--rose); }
  .virtual-card {
    display: inline-block; width: 170px; height: 100px;
    background: linear-gradient(135deg, var(--violet) 0%, #312e81 100%);
    border-radius: 14px; padding: 14px; position: relative;
    box-shadow: 0 8px 32px rgba(139,92,246,0.3); flex-shrink: 0;
  }
  .vc-chip { width: 28px; height: 20px; background: linear-gradient(135deg,#ffd700,#ffaa00); border-radius: 4px; margin-bottom: 14px; }
  .vc-dots { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 2px; color: rgba(255,255,255,0.7); }
  .vc-network { position: absolute; bottom: 10px; right: 12px; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 0.5px; }

  /* STAT GRID */
  .stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; transition: border-color 0.2s,transform 0.2s; cursor: default; }
  .stat-card:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-2px); }
  .stat-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .stat-icon { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; font-size: 15px; }
  .stat-trend { font-size: 11px; font-weight: 600; padding: 3px 7px; border-radius: 6px; }
  .trend-up   { background: rgba(198,255,87,0.12); color: var(--lime); }
  .trend-down { background: rgba(251,113,133,0.12); color: var(--rose); }
  .stat-value { font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 500; letter-spacing: -0.5px; }
  .stat-label { font-size: 12px; color: var(--muted2); margin-top: 3px; }

  /* TWO COL */
  .two-col { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }

  /* PANELS */
  .panel { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
  .panel-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 16px; border-bottom: 1px solid var(--border); }
  .panel-title { font-size: 15px; font-weight: 700; }
  .panel-link { font-size: 12px; color: var(--lime); cursor: pointer; }
  .panel-link:hover { text-decoration: underline; }

  .tx-list { padding: 8px 0; }
  .tx-item { display: flex; align-items: center; gap: 14px; padding: 12px 24px; transition: background 0.15s; }
  .tx-item:hover { background: rgba(255,255,255,0.02); }
  .tx-icon-wrap { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; font-size: 17px; flex-shrink: 0; }
  .tx-info { flex: 1; min-width: 0; }
  .tx-name { font-size: 14px; font-weight: 600; }
  .tx-date { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .tx-amount { font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500; text-align: right; }
  .tx-amount.neg { color: var(--rose); }
  .tx-amount.pos { color: var(--lime); }
  .tx-cat { font-size: 10px; color: var(--muted); text-align: right; margin-top: 2px; }

  .chart-wrap { padding: 20px 24px 24px; }
  .chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 130px; margin-bottom: 8px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; }
  .bar-fill { width: 100%; border-radius: 6px 6px 0 0; min-height: 4px; }
  .bar-fill.active { background: var(--lime) !important; }
  .bar-fill:not(.active) { background: var(--card2); }
  .bar-label { font-size: 10px; color: var(--muted); margin-top: 6px; }

  .quick-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; padding: 16px; }
  .qa-btn { background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 14px; cursor: pointer; text-align: center; transition: all 0.15s; font-family: 'Syne', sans-serif; }
  .qa-btn:hover { border-color: rgba(198,255,87,0.3); background: var(--lime-dim); }
  .qa-icon { font-size: 20px; margin-bottom: 6px; }
  .qa-label { font-size: 12px; font-weight: 600; color: var(--muted2); }
  .qa-btn:hover .qa-label { color: var(--lime); }

  .goal-item { padding: 14px 20px; border-bottom: 1px solid var(--border); }
  .goal-item:last-child { border-bottom: none; }
  .goal-top { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .goal-name { font-size: 13px; font-weight: 600; }
  .goal-pct { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--muted2); }
  .goal-bar-track { height: 5px; background: var(--card2); border-radius: 3px; overflow: hidden; }
  .goal-bar-fill { height: 100%; border-radius: 3px; }
  .goal-amounts { display: flex; justify-content: space-between; margin-top: 5px; font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; }

  /* BOTTOM NAV */
  .bottom-nav {
    display: none; position: fixed; bottom: 0; left: 0; right: 0;
    background: var(--surface); border-top: 1px solid var(--border);
    padding: 8px 0 max(8px, env(safe-area-inset-bottom)); z-index: 30;
  }
  .bottom-nav-inner { display: flex; justify-content: space-around; align-items: center; }
  .bn-item { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 10px; cursor: pointer; transition: all 0.15s; flex: 1; }
  .bn-icon { font-size: 20px; line-height: 1; }
  .bn-label { font-size: 10px; font-weight: 600; color: var(--muted); }
  .bn-item.active .bn-label { color: var(--lime); }
  .bn-item.active .bn-icon { filter: drop-shadow(0 0 6px rgba(198,255,87,0.6)); }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  .animate { animation: fadeUp 0.5s ease forwards; }
  .d1 { animation-delay:0.05s; opacity:0; }
  .d2 { animation-delay:0.12s; opacity:0; }
  .d3 { animation-delay:0.19s; opacity:0; }
  .d4 { animation-delay:0.26s; opacity:0; }

  /* ─── TABLET (≤1024px) ─── */
  @media (max-width: 1024px) {
    .stat-grid { grid-template-columns: repeat(2,1fr); }
    .two-col   { grid-template-columns: 1fr; }
  }

  /* ─── MOBILE (≤768px) ─── */
  @media (max-width: 768px) {
    .shell { grid-template-columns: 1fr; }

    .sidebar {
      position: fixed; top: 0; left: 0;
      width: 280px; height: 100vh;
      transform: translateX(-100%);
      box-shadow: 8px 0 40px rgba(0,0,0,0.6);
    }
    .sidebar.open { transform: translateX(0); }

    .hamburger { display: flex; }

    .main { padding: 20px 16px 90px; grid-column: 1; }

    .topbar { margin-bottom: 20px; }
    .topbar-left h1 { font-size: 17px; }
    .topbar-left p  { display: none; }
    .btn-ghost { display: none; }
    .btn-primary { padding: 8px 14px; font-size: 12px; }

    .hero-card { padding: 20px; border-radius: 16px; }
    .hero-balance { font-size: 32px; letter-spacing: -1px; }
    .virtual-card { display: none; }
    .hero-chips { gap: 8px; }
    .chip { padding: 8px 12px; min-width: 0; }
    .chip-value { font-size: 13px; }

    .stat-grid { grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 20px; }
    .stat-value { font-size: 18px; }
    .stat-card { padding: 14px; }

    .two-col { grid-template-columns: 1fr; gap: 16px; }

    .tx-item { padding: 10px 16px; gap: 10px; }
    .tx-icon-wrap { width: 36px; height: 36px; font-size: 14px; }
    .panel-header { padding: 14px 16px 12px; }
    .panel-title  { font-size: 14px; }

    .chart-wrap   { padding: 14px 16px 18px; }
    .chart-bars   { height: 90px; }

    .quick-grid { grid-template-columns: repeat(4,1fr); padding: 12px; gap: 8px; }
    .qa-btn     { padding: 10px 4px; }
    .qa-icon    { font-size: 17px; }
    .qa-label   { font-size: 10px; }

    .bottom-nav { display: block; }
  }

  /* ─── SMALL MOBILE (≤400px) ─── */
  @media (max-width: 400px) {
    .hero-balance { font-size: 26px; }
    .hero-chips   { flex-direction: column; }
    .chip         { min-width: 100%; }
    .quick-grid   { grid-template-columns: repeat(2,1fr); }
  }
`;

// Formatea número como CLP: $1.284.500 (sin decimales, puntos como miles)
const clp = (n) => {
  const abs = Math.abs(Math.round(n));
  return "$" + abs.toLocaleString("es-CL");
};

const TRANSACTIONS = [
  { id:1, name:"Netflix",       date:"Hoy, 09:14",  amount:-15990,    cat:"Entretenimiento", icon:"🎬", bg:"rgba(229,9,20,0.15)" },
  { id:2, name:"Salario Feb",   date:"Hoy, 08:00",  amount:+3200000,  cat:"Ingreso",          icon:"💼", bg:"rgba(198,255,87,0.12)" },
  { id:3, name:"Uber Eats",     date:"Ayer, 20:41", amount:-28500,    cat:"Comida",           icon:"🍔", bg:"rgba(251,186,44,0.15)" },
  { id:4, name:"Spotify",       date:"18 Feb",      amount:-9990,     cat:"Entretenimiento", icon:"🎵", bg:"rgba(30,215,96,0.12)" },
  { id:5, name:"Transferencia", date:"17 Feb",      amount:+500000,   cat:"Ingreso",          icon:"↗️", bg:"rgba(34,211,238,0.12)" },
  { id:6, name:"Supermercado",  date:"16 Feb",      amount:-87300,    cat:"Hogar",            icon:"🛒", bg:"rgba(139,92,246,0.15)" },
];

const BARS = [
  {label:"Ago",h:45},{label:"Sep",h:60},{label:"Oct",h:38},
  {label:"Nov",h:75},{label:"Dic",h:90},{label:"Ene",h:55},
  {label:"Feb",h:68,active:true},
];

const GOALS = [
  { name:"Viaje a Europa 🌍",    current:1800000, target:3000000, color:"var(--violet)" },
  { name:"Fondo emergencia 🛡️", current:4200000, target:5000000, color:"var(--lime)" },
  { name:"MacBook Pro 💻",       current:650000,  target:2000000, color:"var(--cyan)" },
];

const STATS = [
  { label:"Gastos",   value:"$1.284.500", trend:"+8%",  up:false, icon:"💳", bg:"rgba(251,113,133,0.12)" },
  { label:"Ingresos", value:"$3.700.000", trend:"+12%", up:true,  icon:"📈", bg:"rgba(198,255,87,0.12)" },
  { label:"Ahorro",   value:"$2.415.500", trend:"+5%",  up:true,  icon:"🏦", bg:"rgba(34,211,238,0.12)" },
  { label:"Subs",     value:"$67.000",    trend:"-3%",  up:true,  icon:"🔁", bg:"rgba(139,92,246,0.12)" },
];

const NAV = [
  {label:"Dashboard",   icon:"◈"},
  {label:"Gastos",      icon:"↕", badge:"3"},
  {label:"Tarjetas",    icon:"▣"},
  {label:"Metas",       icon:"◎"},
  {label:"Inversiones", icon:"△"},
  {label:"Reportes",    icon:"≡"},
];

const BOTTOM_NAV = [
  {label:"Inicio",   icon:"◈"},
  {label:"Gastos",   icon:"↕"},
  {label:"Tarjetas", icon:"▣"},
  {label:"Metas",    icon:"◎"},
  {label:"Perfil",   icon:"⊙"},
];

export default function App() {
  const [activeNav,    setActiveNav]    = useState(0);
  const [activeMob,    setActiveMob]    = useState(0);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <style>{styles}</style>

      <div className={`overlay ${sidebarOpen ? "open" : ""}`} onClick={closeSidebar} />

      <div className="shell">

        {/* ── SIDEBAR ── */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="logo">
            <div className="logo-mark">G</div>
            <div className="logo-name">Gasta<span>dol</span></div>
          </div>

          <div className="nav-section">Menú</div>
          {NAV.map((n, i) => (
            <div key={i} className={`nav-item ${i===activeNav?"active":""}`}
              onClick={() => { setActiveNav(i); closeSidebar(); }}>
              <span className="nav-icon">{n.icon}</span>
              {n.label}
              {n.badge && <span className="nav-badge">{n.badge}</span>}
            </div>
          ))}

          <div className="nav-section">Config</div>
          <div className="nav-item" onClick={closeSidebar}><span className="nav-icon">⊛</span> Ajustes</div>
          <div className="nav-item" onClick={closeSidebar}><span className="nav-icon">⊙</span> Ayuda</div>

          <div className="sidebar-bottom">
            <div className="avatar-row">
              <div className="avatar">JM</div>
              <div className="avatar-info">
                <div className="avatar-name">Diego Muller</div>
                <div className="avatar-role">Plan Pro</div>
              </div>
              <span style={{color:"var(--muted)",fontSize:14}}>⋯</span>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="main">

          {/* TOP BAR */}
          <div className="topbar animate d1">
            <div className="topbar-left">
              <div className="hamburger" onClick={() => setSidebarOpen(true)}>
                <span /><span /><span />
              </div>
              <div>
                <h1>Buen día, Diego 👋</h1>
                <p>Jueves, 19 de febrero de 2026</p>
              </div>
            </div>
            <div className="topbar-actions">
              <div className="notif-btn">🔔<span className="notif-dot"/></div>
              <button className="btn btn-ghost">Exportar</button>
              <button className="btn btn-primary">+ Nuevo gasto</button>
            </div>
          </div>

          {/* HERO */}
          <div className="hero-card animate d2">
            <div className="hero-top">
              <div>
                <div className="hero-label">Balance total</div>
                <div className="hero-balance"><span>$</span>12.480<span>.500</span></div>
                <div className="hero-change">↑ 4,2% vs mes anterior</div>
              </div>
              <div className="virtual-card">
                <div className="vc-chip"/>
                <div className="vc-dots">•••• 4821</div>
                <div className="vc-network">VISA</div>
              </div>
            </div>
            <div className="hero-chips">
              <div className="chip">
                <div className="chip-icon income">⬆</div>
                <div className="chip-info">
                  <div className="chip-label">Ingresos</div>
                  <div className="chip-value income">+$3.700.000</div>
                </div>
              </div>
              <div className="chip">
                <div className="chip-icon spend">⬇</div>
                <div className="chip-info">
                  <div className="chip-label">Gastos</div>
                  <div className="chip-value spend">-$1.284.500</div>
                </div>
              </div>
              <div className="chip">
                <div className="chip-icon" style={{background:"rgba(34,211,238,0.15)"}}>◈</div>
                <div className="chip-info">
                  <div className="chip-label">Ahorro</div>
                  <div className="chip-value" style={{color:"var(--cyan)"}}>$2.415.500</div>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="stat-grid animate d3">
            {STATS.map((s,i) => (
              <div className="stat-card" key={i}>
                <div className="stat-head">
                  <div className="stat-icon" style={{background:s.bg}}>{s.icon}</div>
                  <span className={`stat-trend ${s.up?"trend-up":"trend-down"}`}>{s.trend}</span>
                </div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* TWO COL */}
          <div className="two-col animate d4">

            <div style={{display:"flex",flexDirection:"column",gap:20}}>

              {/* TRANSACTIONS */}
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">Últimas transacciones</span>
                  <a className="panel-link">Ver todas →</a>
                </div>
                <div className="tx-list">
                  {TRANSACTIONS.map(tx => (
                    <div className="tx-item" key={tx.id}>
                      <div className="tx-icon-wrap" style={{background:tx.bg}}>{tx.icon}</div>
                      <div className="tx-info">
                        <div className="tx-name">{tx.name}</div>
                        <div className="tx-date">{tx.date}</div>
                      </div>
                      <div>
                        <div className={`tx-amount ${tx.amount<0?"neg":"pos"}`}>
                          {tx.amount>0?"+":"-"}{clp(tx.amount)}
                        </div>
                        <div className="tx-cat">{tx.cat}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CHART */}
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">Gasto mensual</span>
                  <div style={{display:"flex",gap:8}}>
                    {["6M","1A","Todo"].map((t,i) => (
                      <span key={i} style={{
                        fontSize:11, padding:"3px 8px", borderRadius:6, cursor:"pointer",
                        background: i===0?"var(--lime-dim)":"transparent",
                        color: i===0?"var(--lime)":"var(--muted)",
                        border:`1px solid ${i===0?"rgba(198,255,87,0.2)":"transparent"}`,
                        fontWeight:600,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="chart-wrap">
                  <div className="chart-bars">
                    {BARS.map((b,i) => (
                      <div className="bar-col" key={i}>
                        <div className={`bar-fill ${b.active?"active":""}`} style={{height:`${b.h}%`}}/>
                        <span className="bar-label">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:20}}>

              {/* QUICK ACTIONS */}
              <div className="panel">
                <div className="panel-header"><span className="panel-title">Acciones rápidas</span></div>
                <div className="quick-grid">
                  {[{icon:"↗️",label:"Transferir"},{icon:"📥",label:"Depositar"},{icon:"📊",label:"Analizar"},{icon:"🔁",label:"Programar"}].map((q,i) => (
                    <div className="qa-btn" key={i}>
                      <div className="qa-icon">{q.icon}</div>
                      <div className="qa-label">{q.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GOALS */}
              <div className="panel" style={{flex:1}}>
                <div className="panel-header">
                  <span className="panel-title">Metas de ahorro</span>
                  <a className="panel-link">+ Meta</a>
                </div>
                {GOALS.map((g,i) => {
                  const pct = Math.round((g.current/g.target)*100);
                  return (
                    <div className="goal-item" key={i}>
                      <div className="goal-top">
                        <span className="goal-name">{g.name}</span>
                        <span className="goal-pct">{pct}%</span>
                      </div>
                      <div className="goal-bar-track">
                        <div className="goal-bar-fill" style={{width:`${pct}%`,background:g.color}}/>
                      </div>
                      <div className="goal-amounts">
                        <span>{clp(g.current)}</span>
                        <span>{clp(g.target)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </main>
      </div>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {BOTTOM_NAV.map((n,i) => (
            <div key={i} className={`bn-item ${i===activeMob?"active":""}`} onClick={() => setActiveMob(i)}>
              <span className="bn-icon">{n.icon}</span>
              <span className="bn-label">{n.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}