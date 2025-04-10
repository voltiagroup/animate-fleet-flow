
import FleetVisualization from "@/components/FleetVisualization";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Fleet Composition Visualization</h1>
      <p className="text-slate-300 mb-8 text-center max-w-2xl">Interactive visualization of vehicle fleet data with animated transitions and responsive design</p>
      <div className="w-full max-w-6xl">
        <FleetVisualization />
      </div>
    </div>
  );
};

export default Index;
