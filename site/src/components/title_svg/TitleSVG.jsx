import React from "react";

export function TitleSVG({ title }) {
  return (
    <>
      <svg
        width='180'
        height='40'
        viewBox='0 0 180 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10 20C40 20 55 8 75 20'
          stroke='#638246'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M170 20C140 20 125 8 105 20'
          stroke='#638246'
          strokeWidth='1.5'
          strokeLinecap='round'
        />

        <ellipse
          cx='52'
          cy='13'
          rx='5'
          ry='2'
          transform='rotate(-30 52 13)'
          fill='#638246'
        />

        <ellipse
          cx='128'
          cy='13'
          rx='5'
          ry='2'
          transform='rotate(30 128 13)'
          fill='#638246'
        />

        <circle cx='90' cy='20' r='2' fill='#638246' />
      </svg>
      <h2>{title}</h2>
    </>
  );
}
