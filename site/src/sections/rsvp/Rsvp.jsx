import React, { useState } from "react";

import styles from "./Rsvp.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

import { create_confirmation } from "../../services/invites";

export function Rsvp() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");

  async function confirmation_create() {
    if (loading) return;

    if (!fullName.trim()) {
      setMessage("Informe seu nome completo");
      setMessageType("error");
      return;
    }

    setLoading(true);

    setMessage("Processando confirmação...");
    setMessageType("success");

    try {
      const response = await create_confirmation(fullName);

      if (!response.success) {
        setMessage(response.error);
        setMessageType("error");
        return;
      }

      setFullName("");

      setMessage("Muito obrigado por confirmar sua presença!");
      setMessageType("success");
    } catch (error) {
      console.error(error);

      setMessage("Erro ao confirmar presença");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.container} id='rsvp'>
      <TitleSVG title='CONFIRME SUA PRESENÇA' />

      <div className={styles.content}>
        <h3>Confirme sua presença</h3>

        <p>
          Sua presença tornará este momento ainda mais especial. Para confirmar
          sua participação, informe abaixo seu nome completo.
        </p>

        <div className={styles.input}>
          <h4>Nome Completo</h4>

          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='Digite seu nome completo'
          />
        </div>

        <button onClick={confirmation_create} disabled={loading}>
          {loading ? "Confirmando..." : "Confirmar"}
        </button>

        {message && (
          <p
            className={
              messageType === "success"
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
