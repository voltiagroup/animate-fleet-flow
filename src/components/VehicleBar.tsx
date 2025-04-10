
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Car } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface VehicleProps {
  vehicle: {
    model: string;
    count: number;
    manufacturer: string;
  };
  maxCount: number;
  colorClass: string;
}

const VehicleBar = ({ vehicle, maxCount, colorClass }: VehicleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const percentWidth = Math.max((vehicle.count / maxCount) * 100, 5); // Minimum 5% width
  
  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center mb-1 text-sm text-slate-300">
        <Car 
          size={16} 
          className={cn(
            "mr-2 transition-transform duration-300", 
            isHovered ? "text-white scale-125" : "text-slate-400"
          )} 
        />
        <span className="truncate max-w-[150px] sm:max-w-[250px] md:max-w-full">
          {vehicle.model}
        </span>
      </div>
      <div className="relative h-8 bg-slate-700 rounded-lg overflow-hidden">
        <div 
          className={cn(
            "vehicle-bar h-full bg-gradient-to-r rounded-lg flex items-center px-3 transition-all duration-300",
            colorClass,
            isHovered ? "brightness-110 shadow-glow" : ""
          )}
          style={{ width: `${percentWidth}%` }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="count-value font-bold ml-auto text-white">
                  {vehicle.count}
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-900 border-slate-700">
                <div className="p-2">
                  <p className="font-medium">{vehicle.model}</p>
                  <p className="text-sm text-slate-300">Manufacturer: {vehicle.manufacturer}</p>
                  <p className="text-sm text-slate-300">Count: {vehicle.count}</p>
                  <p className="text-sm text-slate-300">
                    {(vehicle.count / maxCount * 100).toFixed(1)}% of fleet
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default VehicleBar;
