import React, { useState } from "react";

import styles from "./Rsvp.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

import { create_confirmation } from "../../services/invites";

export function Rsvp() {
  const [fullName, setFullName] = useState("");

  async function confirmation_create() {
    if (!fullName.trim()) {
      alert("Informe o nome igual ao convite");

      return;
    }
    try {
      const response = await create_confirmation(fullName);

      if (!response.success) {
        alert(response.error);
        return;
      }
      alert("Muito obrigado por confirmar sua presença");
    } catch (error) {
      console.error(error);

      alert("Erro ao confirmar presença");
      return;
    }
  }
  return (
    <section className={styles.container} id='rsvp'>
      <TitleSVG title='CONFIRME SUA PRESENÇA' />

      <div className={styles.content}>
        <h3>Encontre seu convite</h3>
        <p>
          Sua presença tornará este momento ainda mais especial. Para confirmar
          sua participação, informe abaixo o nome completo das pessoas incluídas
          no convite.
        </p>
        <div className={styles.input}>
          <h4>Nome Completo</h4>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <button onClick={confirmation_create}>Confirmar</button>
      </div>
    </section>
  );
}
