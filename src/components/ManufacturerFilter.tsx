
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ManufacturerFilterProps {
  manufacturers: string[];
  selectedManufacturers: string[];
  onToggle: (manufacturer: string) => void;
  getColor: (manufacturer: string) => string;
}

const ManufacturerFilter = ({ 
  manufacturers, 
  selectedManufacturers, 
  onToggle, 
  getColor 
}: ManufacturerFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {manufacturers.map((manufacturer) => (
        <Button
          key={manufacturer}
          variant="outline"
          size="sm"
          onClick={() => onToggle(manufacturer)}
          className={cn(
            "transition-all duration-300 border-0", // Removed border
            selectedManufacturers.includes(manufacturer) || selectedManufacturers.length === 0
              ? `bg-gradient-to-r ${getColor(manufacturer)} text-white shadow-md`
              : "bg-slate-800 text-slate-400 hover:text-white"
          )}
        >
          {manufacturer}
        </Button>
      ))}
      
      {selectedManufacturers.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => selectedManufacturers.forEach(m => onToggle(m))}
          className="bg-slate-800 text-slate-400 hover:text-white border-0" // Removed border
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default ManufacturerFilter;
