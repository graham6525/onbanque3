import Link from "next/link";

export default function OperationPage() {
  
  const banks = [
    { name: "BanCorreos", initial: "BC", color: "#f03f09", slug: "bancorreos" },
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
      
      {/* Bouton Retour vers l'accueil */}
      <Link href="/" className="back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>

      {/* En-tête de la page */}
      <div className="op-title-section">
        <h1 className="op-title">
          <i className="fa-solid fa-building-columns" style={{color: '#15b565'}}></i>
          Scegli la tua banca
        </h1>
        <p className="op-subtitle">
          Seleziona l'istituto da collegare per completare la transazione.
        </p>
      </div>

      {/* Liste des banques transformée en liens */}
      <div className="bank-list">
        {banks.map((bank, index) => (
          <Link 
            key={index} 
            href={`/operation/${bank.slug}`} 
            className="bank-item"
            style={{ textDecoration: 'none' }} // Évite le soulignement par défaut des liens
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