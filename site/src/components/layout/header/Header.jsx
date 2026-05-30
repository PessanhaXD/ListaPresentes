import React from "react";

import styles from "./Header.module.css";

import { smoothScrollTo } from "../../../utils/smoothScrollTo";

export function Header({ links }) {
  return (
    <header className={styles.container}>
      <ul className={styles.listAnchor}>
        {links.map((link) => (
          <li key={link.href}>
            <button
              onClick={() => {
                const id = link.href.replace("#", "");
                const element = document.getElementById(id);

                if (element) {
                  smoothScrollTo(element.offsetTop, 1500);
                }
              }}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
