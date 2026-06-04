import React from "react";

import styles from "./Information.module.css";

export function Information() {
  return (
    <section className={styles.container} id='home'>
      <p>
        Criamos este espaço com muito carinho para compartilhar um dos momentos
        mais importantes das nossas vidas. Aqui você encontrará todas as
        informações sobre o nosso casamento, incluindo local, horário, lista de
        presentes e confirmação de presença.
      </p>

      <p>
        Estamos muito felizes por poder celebrar este dia ao lado de pessoas tão
        especiais que fizeram e fazem parte da nossa história. Cada presença,
        mensagem de carinho e gesto de afeto tornam esse momento ainda mais
        significativo para nós.
      </p>

      <p>
        Agradecemos por fazerem parte dessa nova etapa e esperamos compartilhar
        muitas emoções, sorrisos e lembranças inesquecíveis ao lado de vocês.
      </p>
    </section>
  );
}
