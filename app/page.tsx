import { ObjectDetection } from "@/components/ObjectDetection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-center p-8">
      <h1 className="gradient-text font-medium text-2xl md:text-3xl lg:text-5xl tracking-tighter text-center">Vehicale traking And Classification count</h1>
       <ObjectDetection/>
    </div>
  );
}
