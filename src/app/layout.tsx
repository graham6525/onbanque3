"use client"; // On ajoute ceci car on utilise usePathname

import { usePathname } from "next/navigation";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const pathname = usePathname();

  // Détecte si l'utilisateur est actuellement dans la section allemande
  const isDe = pathname.startsWith("/it");
  const langPrefix = isDe ? "/it" : "";

  // Fonction utilitaire mise à jour pour gérer le préfixe de langue
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === "/it";
    }
    return pathname === path || pathname === `/it${path}`;
  };

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="shortcut icon" href="/img/logo.png" type="image/x-icon" />
      </head>
      <body>
        <div className="app-container">
          
          {/* --- SIDEBAR (PC uniquement) --- */}
          <aside className="sidebar">
            <div className="logo-container">
              {/* <i className="fa-solid fa-circle-notch"></i> */}
              <div className="log">O</div>
              Onbanque
            </div>
            {/* --- TOPBAR DE LANGUE (Sidebar PC) --- */}
            <div className="sidebar-lang-topbar" style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f3f4f6", marginBottom: "15px" }}>
              <Link 
                href={pathname.replace(/^\/it/, "") || "/"} 
                style={{ flex: 1, padding: "6px", textAlign: "center", cursor: "pointer", borderRadius: "6px", border: !isDe ? "2px solid #2563eb" : "1px solid #ccc", background: !isDe ? "#eff6ff" : "#fff", fontWeight: !isDe ? "bold" : "normal", fontSize: "12px", textDecoration: "none", color: "#000" }}
              >
                 🇪🇸   ES
              </Link>
              <Link 
                href={pathname.startsWith("/it") ? pathname : `/it${pathname === "/" ? "" : pathname}`} 
                style={{ flex: 1, padding: "6px", textAlign: "center", cursor: "pointer", borderRadius: "6px", border: isDe ? "2px solid #2563eb" : "1px solid #ccc", background: isDe ? "#eff6ff" : "#fff", fontWeight: isDe ? "bold" : "normal", fontSize: "12px", textDecoration: "none", color: "#000" }}
              >
                🇮🇹 IT
              </Link>
            </div>


            <nav className="nav-links">
              <Link href={`${langPrefix}/`} className={`nav-link ${isActive("/") ? "active" : ""}`}>
  <i className="fa-solid fa-house"></i>
  {isDe ? "Iniziale" : "Hogar"}
</Link>
<Link href={`${langPrefix}/operation`} className={`nav-link ${isActive("/operation") ? "active" : ""}`}>
  <i className="fa-solid fa-money-bill-transfer"></i>
  {isDe ? "transazione" : "Operación"}
</Link>
<Link href={`${langPrefix}/historique`} className={`nav-link ${isActive("/historique") ? "active" : ""}`}>
  <i className="fa-solid fa-clock-rotate-left"></i>
  {isDe ? "Corso" : "Histórico"}
</Link>
<Link href={`${langPrefix}/actualite`} className={`nav-link ${isActive("/actualite") ? "active" : ""}`}>
  <i className="fa-solid fa-newspaper"></i>
  {isDe ? "notizia" : "Noticias"}
</Link>


            </nav>
          </aside>

          {/* --- MAIN CONTENT AREA --- */}
          <main className="main-content">
            {children}
          </main>

          {/* --- NAVIGATION BASSE (Mobile uniquement) --- */}
          <nav className="mobile-nav">
            <Link href={`${langPrefix}/`} className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}>
              <i className="fa-solid fa-house"></i>
              <span>{isDe ? "Iniziale" : "Hogar"}</span>
              {isActive("/") && <div className="active-dot"></div>}
            </Link>
            <Link href={`${langPrefix}/operation`} className={`mobile-nav-link ${isActive("/operation") ? "active" : ""}`}>
              <i className="fa-solid fa-money-bill-transfer"></i>
              <span>{isDe ? "Transazione" : "Operación"}</span>
              {isActive("/operation") && <div className="active-dot"></div>}
            </Link>
            <Link href={`${langPrefix}/historique`} className={`mobile-nav-link ${isActive("/historique") ? "active" : ""}`}>
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span>{isDe ? "Corso" : "Histórico"}</span>
              {isActive("/historique") && <div className="active-dot"></div>}
            </Link>
            <Link href={`${langPrefix}/actualite`} className={`mobile-nav-link ${isActive("/actualite") ? "active" : ""}`}>
              <i className="fa-solid fa-newspaper"></i>
              <span>{isDe ? "notizia" : "Noticias"}</span>
              {isActive("/actualite") && <div className="active-dot"></div>}
            </Link>
            {/* <Link href={`${langPrefix}/profil`} className={`mobile-nav-link ${isActive("/profil") ? "active" : ""}`}>
              <i className="fa-solid fa-user"></i>
              <span>{isDe ? "Profil" : "Profil"}</span>
              {isActive("/profil") && <div className="active-dot"></div>}
            </Link> */}
          </nav>

        </div>
      </body>
    </html>
  );
}