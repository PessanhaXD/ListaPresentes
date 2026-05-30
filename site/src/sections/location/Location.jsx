import React from "react";

import styles from "./Location.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

export function Location() {
  return (
    <section className={styles.container} id='location'>
      <TitleSVG title='LOCAL DA CELEBRAÇÃO' />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla
        gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros
        bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in
        mauris eu nibh euismod gravida. Suspendisse potenti. Praesent dapibus,
        neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna
        eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis,
        accumsan porttitor, facilisis luctus, metus.
      </p>

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
