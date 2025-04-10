
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import VehicleBar from "@/components/VehicleBar";
import ManufacturerFilter from "@/components/ManufacturerFilter";
import fleetData from "@/data/fleetData";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FleetVisualization = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"count" | "name">("count");
  const [maxCount, setMaxCount] = useState(0);
  
  const manufacturers = Array.from(new Set(fleetData.map(item => item.manufacturer)));
  const filteredData = selectedManufacturers.length > 0
    ? fleetData.filter(item => selectedManufacturers.includes(item.manufacturer))
    : fleetData;
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "count") return b.count - a.count;
    return a.model.localeCompare(b.model);
  });

  useEffect(() => {
    // Find maximum count for scaling
    const max = Math.max(...filteredData.map(item => item.count));
    setMaxCount(max);
  }, [filteredData]);

  useEffect(() => {
    if (chartRef.current) {
      // Main animation sequence
      const bars = chartRef.current.querySelectorAll(".vehicle-bar");
      
      gsap.fromTo(
        bars, 
        { 
          width: 0, 
          opacity: 0 
        },
        { 
          width: "100%", 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.08, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
            once: true
          }
        }
      );
      
      // Animate the count numbers
      const counters = chartRef.current.querySelectorAll(".count-value");
      gsap.fromTo(
        counters,
        { textContent: "0" },
        {
          textContent: (i) => sortedData[i]?.count.toString() || "0",
          duration: 1.5,
          stagger: 0.08,
          ease: "power2.out",
          snap: { textContent: 1 },
          delay: 0.5
        }
      );
    }
  }, [sortedData, sortBy, selectedManufacturers]);
  
  const toggleManufacturer = (manufacturer: string) => {
    setSelectedManufacturers(prev => 
      prev.includes(manufacturer) 
        ? prev.filter(m => m !== manufacturer)
        : [...prev, manufacturer]
    );
  };
  
  const getManufacturerColor = (manufacturer: string) => {
    switch(manufacturer.toLowerCase()) {
      case "hyundai": return "from-blue-400 to-blue-600";
      case "skoda": return "from-green-400 to-green-600";
      case "vw": return "from-slate-400 to-slate-600";
      case "audi": return "from-yellow-400 to-yellow-500"; // Changed from red to yellow
      default: return "from-purple-400 to-purple-600";
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 animate-fade-in">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#26264D] mb-2 md:mb-0">
          Fleet Composition
          <span className="ml-2 text-sm font-normal text-slate-500">
            ({filteredData.reduce((acc, item) => acc + item.count, 0)} vehicles)
          </span>
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <ManufacturerFilter 
            manufacturers={manufacturers}
            selectedManufacturers={selectedManufacturers}
            onToggle={toggleManufacturer}
            getColor={getManufacturerColor}
          />
          
          <div className="ml-2">
            <select 
              className="bg-slate-100 text-slate-800 px-3 py-2 rounded-md text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "count" | "name")}
            >
              <option value="count">Sort by Count</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>
      
      <div 
        ref={chartRef} 
        className="space-y-3 mt-6"
      >
        {sortedData.map((vehicle) => (
          <VehicleBar 
            key={vehicle.model}
            vehicle={vehicle}
            maxCount={maxCount}
            colorClass={getManufacturerColor(vehicle.manufacturer)}
          />
        ))}
      </div>
    </div>
  );
};

export default FleetVisualization;
