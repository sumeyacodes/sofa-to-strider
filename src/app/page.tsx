import Image from "next/image";
import WeatherApp from "@/components/weather";
import { Locations } from "@/components/locations";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10 p-5">
      <Image
        src="/walking-icon.png"
        alt="Logo"
        width={180}
        height={38}
        priority
      />
      <h1 className="text-5xl font-bold text-center">Sofa to Strider</h1>

      {/* shadcn example component */}
    

      {/* can rename/restructure these components */}
      <WeatherApp />
      <Locations />
    </main>
  );
}
