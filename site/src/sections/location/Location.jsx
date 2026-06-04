import React from "react";

import styles from "./Location.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

export function Location() {
  return (
    <section className={styles.container} id='location'>
      <TitleSVG title='LOCAL DA CELEBRAÇÃO' />
      <div className={styles.content}>
        <p>
          Depois de tantos momentos vividos juntos, chegou a hora de celebrarmos
          o início de uma nova etapa.
        </p>

        <p>
          <span>No dia 15 de novembro de 2026, às 17h</span>, daremos um dos
          passos mais importantes de nossas vidas e teremos a alegria de
          compartilhar essa felicidade com pessoas que amamos.
        </p>

        <p>
          Nossa celebração acontecerá na{" "}
          <span>Casa de Festas Mansão Valqueire</span>, localizada na{" "}
          <span>
            Rua das Azaléas, 197 - Vila Valqueire, Rio de Janeiro - RJ
          </span>
          , um lugar escolhido com muito carinho para receber todos aqueles que
          fazem parte da nossa história.
        </p>

        <p>
          Cada detalhe deste dia está sendo preparado com amor, e nossa maior
          felicidade será poder viver esse momento cercados por familiares e
          amigos que acompanharam nossa caminhada até aqui. Esperamos vocês para
          celebrar, sorrir, se emocionar e criar conosco lembranças que ficarão
          guardadas para sempre.
        </p>
      </div>

      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.8568684292213!2d-43.366160721632674!3d-22.881745190708926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99628b4a833a75%3A0xb5995966ed847611!2sCasa%20de%20Festas%20Mans%C3%A3o%20Valqueire!5e0!3m2!1spt-BR!2sbr!4v1780096706879!5m2!1spt-BR!2sbr'
        width='600'
        height='450'
        className={styles.maps}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </section>
  );
}
