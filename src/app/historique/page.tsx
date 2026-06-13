"use client"; // Obligatoire pour utiliser l'interaction (useState)

import { useState } from "react";
import Link from "next/link";


export default function HistoriquePage() {
  return (
    <div className="history-container">
      
      <h1 className="history-header">Cronologia</h1>

      <div className="empty-history-card">
        <div className="empty-icon-circle">
          <i className="fa-solid fa-clock-rotate-left"></i>
        </div>
        
        <h3>Nessuna operazione</h3>
        <p>Le tue operazioni appariranno qui.</p>
      </div>

    </div>
  );
}