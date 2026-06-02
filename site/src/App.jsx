import { Header } from "./components/layout/header/Header";
import { Hero } from "./sections/hero/Hero";
import { Information } from "./sections/information/Information";
import { Countdown } from "./sections/countdown/Countdown";
import { Location } from "./sections/location/Location";
import { GiftList } from "./sections/giftList/GiftList";
import { Rsvp } from "./sections/rsvp/Rsvp";

export function App() {
  return (
    <>
      <Hero />
      <Header
        links={[
          { label: "HOME", href: "#home" },
          { label: "LOCAL DA CELEBRAÇÃO", href: "#location" },
          { label: "LISTA DE PRESENTES", href: "#gifts" },
          { label: "CONFIRME SUA PRESENÇA", href: "#rsvp" },
        ]}
      />
      <Information />
      <Countdown />
      <Location />
      <GiftList />
      <Rsvp />
    </>
  );
}
