export default function openWaze() {
  const latitude = -22.8817205;
  const longitude = -43.3642939;

  const wazeAppUrl = `waze://?ll=${latitude},${longitude}&navigate=yes`;
  const wazeWebUrl = `https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

  // Tenta abrir o aplicativo
  window.location.href = wazeAppUrl;

  // Caso o aplicativo não abra, usa o Waze pelo navegador
  setTimeout(() => {
    window.location.href = wazeWebUrl;
  }, 1500);
}
