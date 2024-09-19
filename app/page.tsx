import { ObjectDetection } from "@/components/ObjectDetection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-center p-8">
      <h1
        className="gradient-text font-extralight text-xl md:text-3xl
         lg:text-5xl tracking-tighter text-center">
        Vehicale traking And Classification count
      </h1>
      <ObjectDetection />
    </div>
  );
}
