import React, { useEffect, useState } from 'react';

import styles from './GiftList.module.css';

import { TitleSVG } from '../../components/title_svg/TitleSVG';

import { list_gifts } from '../../services/gifts.js';

export function GiftList() {
  useEffect(() => {
    async function loadGifts() {
      try {
        console.log('Buscando presentes...');

        const data = await list_gifts();

        console.log('Resposta da API:', data);

        setGifts(data);
      } catch (error) {
        console.error('Erro ao buscar presentes:', error);
      } finally {
        console.log('Busca de presentes finalizada.');
      }
    }

    loadGifts();
  }, []);
  return (
    <div className={styles.container}>
      <TitleSVG title='LISTA DE PRESENTES' />

      <div className={styles.actions}>
        <button>Carrinho</button>

        <h3>Ordernar a lista por: </h3>
      </div>
    </div>
  );
}
