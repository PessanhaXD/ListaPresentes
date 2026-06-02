import React, { useState } from "react";

import styles from "./Rsvp.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

export function Rsvp() {
  const [fullName, setFullName] = useState("");
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
        <button>Confirmar</button>
      </div>
    </section>
  );
}
