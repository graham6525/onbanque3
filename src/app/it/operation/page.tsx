"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OperationPage() {
  const pathname = usePathname();

  // Détecte dynamiquement si l'URL commence par /de
  const isDe = pathname.startsWith("/it");
  const langPrefix = isDe ? "/it" : "";

  // Liste des banques
  const banks = [
    { name: "BanCorreos", initial: "BC", color: "#f03f09", slug: "BanCorreos" },
    { name: "BBVA", initial: "B", color: "#11ec8d", slug: "BBVA" },
    { name: "Poste Italienne", initial: "PI", color: "#3b383b", slug: "Posteitalienne" },
    { name: "CAIXA", initial: "CAIXA", color: "#1553c7", slug: "CAIXA" },
    { name: "Cetelem", initial: "CT", color: "#34a1e0", slug: "Cetelem" },
    { name: "ING", initial: "ING", color: "#c46eb5", slug: "ING" },
    { name: "Banco Mediolanum", initial: "BM", color: "#1553c7", slug: "Bancomediolanum" },
    { name: "Santander", initial: "ST", color: "#3b383b", slug: "Santander" },
    
  ];

  return ( 
    <div className="operation-container">
      
      {/* Bouton Retour dynamique vers l'accueil correspondant à la langue */}
      <Link href={`${langPrefix}/`} className="back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>

      {/* En-tête de la page */}
      <div className="op-title-section">
        <h1 className="op-title">
          <i className="fa-solid fa-building-columns" style={{ color: '#15b565' }}></i>
          Seleziona la tua banca
        </h1>
        <p className="op-subtitle">
          Scegli l'istituto con cui desideri connetterti per completare la tua operazione.
        </p>
      </div>

      {/* Liste des banques avec redirection interne au dossier de langue */}
      <div className="bank-list">
        {banks.map((bank, index) => (
          <Link 
            key={index} 
            href={`${langPrefix}/operation/${bank.slug}`} 
            className="bank-item"
            style={{ textDecoration: 'none' }}
          >
            <div className="bank-info">
              <div 
                className="bank-logo-circle" 
                style={{ backgroundColor: bank.color }}
              >
                {bank.initial}
              </div>
              <span className="bank-name">{bank.name}</span>
            </div>
            <i className="fa-solid fa-chevron-right chevron-icon"></i>
          </Link>
        ))}
      </div>

    </div>
  );
}