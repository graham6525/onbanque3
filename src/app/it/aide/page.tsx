"use client";

import Link from "next/link";
import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // Données de la FAQ
  const faqData: FAQItem[] = [
    {
      id: 1,
      category: "Collegamento",
      question: "Come posso collegare il mio conto bancario in totale sicurezza?",
      answer: "Per collegare il tuo conto, vai sulla scheda 'Operazioni', seleziona il tuo istituto bancario e inserisci le tue credenziali. Il nostro sistema utilizza una crittografia end-to-end per proteggere i tuoi accessi."
    },
    {
      id: 2,
      category: "Sicurezza",
      question: "Cos'è la convalida tramite codice SMS (2FA)?",
      answer: "L'autenticazione a due fattori (2FA) è una misura di sicurezza obbligatoria richiesta dalla tua banca. Un codice temporaneo ti viene inviato tramite SMS per confermare che sei effettivamente tu l'autore della richiesta di collegamento."
    },
    {
      id: 3,
      category: "tecnico",
      question: "Cosa fare se il mio codice di確認 non funziona?",
      answer: "Verifica che il codice inserito corrisponda esattamente a quello ricevuto e que il periodo di validità non sia scaduto. Se il problème persiste, clicca su 'Invia di nuovo il codice' o contatta il nostro supporto tecnico."
    }
  ];

  // Filtrage des questions selon la recherche
  const filteredFaq = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="help-container">
      {/* Bouton Retour */}
      <Link href="/it/dashboard" className="back-btn">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>

      {/* En-tête */}
      <div className="help-header">
        <div className="help-icon-box">
          <i className="fa-solid fa-circle-info"></i>
        </div>
        <h1 className="help-title">Centro assistenza</h1>
        <p className="help-subtitle">
          Trova risposte immediate alle tue domande o contatta il nostro team tecnico.
        </p>

        {/* Barre de recherche */}
        <div className="help-search-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            className="help-search-input"
            placeholder="Cerca una domanda, una parola chiave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Section des Questions Fréquentes */}
      <div className="faq-section">
        <h2 className="section-title">Domande frequenti</h2>

        {filteredFaq.length === 0 ? (
          <div className="empty-faq">
            <i className="fa-solid fa-folder-open"></i>
            <p>Nessun risultato corrisponde alla tua ricerca.</p>
          </div>
        ) : (
          <div className="faq-list">
            {filteredFaq.map((item) => (
              <div 
                key={item.id} 
                className={`faq-item ${openFaqId === item.id ? "active" : ""}`}
                onClick={() => toggleFaq(item.id)}
              >
                <div className="faq-question-block">
                  <span className="faq-question">{item.question}</span>
                  <i className={`fa-solid fa-chevron-down faq-arrow`}></i>
                </div>
                <div className="faq-answer-block">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     
    </div>
  );
}