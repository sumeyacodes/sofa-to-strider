import Image from "next/image";
import WeatherApp from "@/components/weather";
import { Locations } from "@/components/locations";
import WhenSubheading from "@/components/ui/when-subheading";
import WhySubheading from "@/components/ui/why-subheading";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-cente gap-10 p-5">
      <Image
        src="/sTsIcon.png"
        alt="Logo"
        width={100}
        height={38}
        priority
        className="rounded-lg"
      />
      <h1 className="text-5xl font-bold text-center">Sofa to Strider</h1>

      <WhenSubheading />

      <WeatherApp />
      <Locations />
      <WhySubheading />
    </main>
  );
}
