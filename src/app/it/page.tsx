"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Home() {

  // À l'intérieur de ton composant de page d'accueil :

const [liveBalance, setLiveBalance] = useState("100 000");


useEffect(() => {

  // Récupère le solde configuré par l'admin

  const getAmount = async () => {  
    try {
      const res = await fetch("/api/global-balance");
      const data = await res.json();
      if (data.balance) setLiveBalance(data.balance);
    } catch (err) {
      console.error(err);
    }
  };



  getAmount();
  // Optionnel : rafraîchir toutes les 5 secondes pour voir le changement en direct
  const interval = setInterval(getAmount, 5000);
  return () => clearInterval(interval);
}, []);

  // État pour savoir si le solde est visible ou caché

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const pathname = usePathname();
const isDe = pathname.startsWith("/it");

  return (
    <div className="home-wrapper">
      {/* Header */}
      <header className="home-header">
        <div className="user-info">
          <div className="avatar-circle">O</div>
          <div> 
            {/* <p className="welcome-msg">Salut 👋</p> */}
            <h1 className="user-display-name">Benvenuto su Onbanque</h1>
          </div>
        </div>
        
        {/* --- SÉLECTEUR DE LANGUE (À la place des notifications) --- */}
        <div className="topbar-lang-switcher" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link 
            href={pathname.replace(/^\/it/, "") || "/"} 
            style={{ padding: "6px 12px", borderRadius: "8px", border: !isDe ? "2px solid #2563eb" : "1px solid #ccc", background: !isDe ? "#eff6ff" : "#fff", fontWeight: !isDe ? "bold" : "normal", fontSize: "13px", textDecoration: "none", color: "#000" }}
          >
            🇪🇸   ES
          </Link>
          <Link 
            href={pathname.startsWith("/it") ? pathname : `/it${pathname === "/" ? "" : pathname}`} 
            style={{ padding: "6px 12px", borderRadius: "8px", border: isDe ? "2px solid #2563eb" : "1px solid #ccc", background: isDe ? "#eff6ff" : "#fff", fontWeight: isDe ? "bold" : "normal", fontSize: "13px", textDecoration: "none", color: "#000" }}
          >
            🇮🇹 IT
          </Link>
        </div>
      </header>

      {/* Carte Solde */}
      <section className="balance-card">
        <div className="balance-label">
          <span><i className="fa-solid fa-wallet"></i> SALDO POTENZIALE DISPONIBILE </span>
          {/* L'icône change selon l'état isVisible */}
          <button onClick={toggleVisibility} style={{ color: '#fff', fontSize: '18px' }}>
            <i className={`fa-regular ${isVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </button>
        </div>

        {/* Le texte change selon l'état isVisible */}
        <div className="balance-value">
  {isVisible ? liveBalance : "*******"} €
</div>

        <div className="balance-stats">
          <i className="fa-solid fa-chart-line"></i> +28% questo mese
        </div>
        
        <div className="quick-actions-grid">
         <Link href="/de/operation" style={{ textDecoration: "none", color: "inherit", display: "contents" }}>
  <button className="q-action-btn">
    <i className="fa-solid fa-hand-holding-dollar"></i> Pagamento
  </button>
</Link>
          {/* <button className="q-action-btn"><i className="fa-regular fa-paper-plane"></i> Envoyer</button> */}
          <Link href="/de/operation" style={{ textDecoration: "none", color: "inherit", display: "contents" }}>
  <button className="q-action-btn">
    <i className="fa-solid fa-arrow-down-long"></i> Ricevi
  </button>
</Link>
          <Link href="/de/actualite" style={{ textDecoration: "none", color: "inherit", display: "contents" }}>
  <button className="q-action-btn">
    <i className="fa-solid fa-ellipsis"></i> Altro
  </button>
</Link>
        </div>
      </section>

      {/* Boutons Principaux */}
      <div className="main-buttons-row">
        <Link href="/de/operation" className="btn-black">
  <i className="fa-solid fa-money-check-dollar"></i>
  Effettua un bonifico
  <i className="fa-solid fa-arrow-right"></i>
</Link>
        <Link href="/de/historique" className="btn-white">
  <i className="fa-solid fa-clock-rotate-left"></i>
  Visualizza le mie operazioni
</Link>
        
      </div>

      {/* Pourquoi Onbanque */}
      <section>
        <h2 className="home-section-title">Perché Onbanque?</h2>
        <div className="feature-item">
          <div className="feature-icon-box"><i className="fa-solid fa-bolt"></i></div>
          <div className="feature-text">
            <h4>Risposta in pochi minuti</h4>
            <p>Decisione immediata sulla tua richiesta.</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-box"><i className="fa-solid fa-shield-halved"></i></div>
          <div className="feature-text">
            <h4>Sicuro al 100%</h4>
            <p>Crittografia end-to-end.</p>
          </div>
        </div>
      </section>

      {/* Simulateur */}
      <section className="simulator-card">
        <div className="sim-header">
          <span style={{fontWeight: 600, fontSize: '14px'}}><i className="fa-solid fa-calculator"></i> Simula in un click</span>
          <span className="sim-tag">Novità</span>
        </div>
        {/* <p style={{fontSize: '12px', color: '#888', margin: '10px 0'}}>Empruntez de 500 € à 10 000 € sur 6 à 84 mois.</p> */}
        
        <div className="sim-amount-row">
          <div>
            <p style={{fontSize: '11px', color: '#888'}}>Importo</p>
            <div className="sim-value-big">10 000 €</div>
          </div>
          <div style={{textAlign: 'right'}}>
            <p style={{fontSize: '11px', color: '#888'}}>Rata mensile a partire da</p>
            <div className="sim-value-green">142 €</div>
          </div>
        </div>


        <Link href="/de/operation" className="btn-black" style={{background: '#15b565', width: '100%', marginTop: '20px', border: 'none'}}>
   <i className="fa-solid fa-rocket"></i> Inizia la mia richiesta
</Link>
      </section>

      {/* Partenaires */}
      <section style={{marginTop: '35px', marginBottom: '30px'}}>
        <h2 className="home-section-title"><i className="fa-solid fa-building-columns"></i> Partner bancari</h2>
        <div className="partners-grid">
          <div className="partner-circle-card">
            <img src="/img/banCorreos.png" alt=" Logo" />
            <span style={{fontSize: '10px'}}>BanCorreos</span>
          </div>
          <div className="partner-circle-card">
            <img src="/img/bbva.webp" alt=" Logo" />
            <span style={{fontSize: '10px'}}>BBVA</span>
          </div>
          <div className="partner-circle-card">
            <img src="/img/caixa.webp" alt="img" />
            <span style={{fontSize: '10px'}}>CAIXA</span>
          </div>
          
          <div className="partner-circle-card">
            <img src="/img/cetelem.png" alt="img" />
            <span style={{fontSize: '10px'}}>Cetelem</span>
          </div>
          <div className="partner-circle-card">
            <img src="/img/ing.png" alt="img" />
            <span style={{fontSize: '10px'}}>ING</span>
          </div>
          
          <div className="partner-circle-card">
            <img src="/img/santander.webp" alt=" img" />
            <span style={{fontSize: '10px'}}>Santander</span>
          </div>

          <div className="partner-circle-card">
            <img src="/img/Bancomediolanum.png" alt=" img" />
            <span style={{fontSize: '10px'}}>Banco Mediolanum</span>
          </div>
          <div className="partner-circle-card">
            <img src="/img/Posteitalienne.webp" alt=" img" />
            <span style={{fontSize: '10px'}}>Poste Italienne</span>
          </div>
          
        </div>
      </section>
    </div>
  );
}