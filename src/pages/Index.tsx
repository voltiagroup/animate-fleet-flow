
import FleetVisualization from "@/components/FleetVisualization";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4">
      <div className="w-full max-w-6xl">
        <FleetVisualization />
      </div>
    </div>
  );
};

export default Index;
