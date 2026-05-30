import { Header } from "./components/layout/header/Header";
import { Hero } from "./sections/hero/Hero";
import { Information } from "./sections/information/Information";
import { Countdown } from "./sections/countdown/Countdown";
import { Location } from "./sections/location/Location";
import { GiftList } from "./sections/giftList/GiftList";

export function App() {
  return (
    <>
      <Header />
      <Hero />
      <Information />
      <Countdown />
      <Location />
      <GiftList />
    </>
  );
}
