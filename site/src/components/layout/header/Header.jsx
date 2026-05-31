import React, { useEffect, useState } from "react";

import styles from "./Header.module.css";

import { smoothScrollTo } from "../../../utils/smoothScrollTo";

export function Header({ links }) {
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) return;

    function handleScroll() {
      const rect = hero.getBoundingClientRect();

      setOnHero(rect.bottom > hero.offsetHeight / 2);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.container} ${
        onHero ? styles.transparent : styles.scrolled
      }`}
    >
      <ul className={styles.listAnchor}>
        {links.map((link) => (
          <li key={link.href}>
            <button
              className={onHero ? styles.buttonHero : styles.buttonScrolled}
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
