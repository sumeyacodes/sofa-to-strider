import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      <Image
        src="/walking-icon.png"
        alt="Logo"
        width={180}
        height={38}
        priority
      />
      <h1 className="text-5xl font-bold text-center">Sofa to Strider</h1>
    </main>
  );
}
