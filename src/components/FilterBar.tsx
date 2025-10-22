import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane, Shirt, Package, Clock, Ticket, LucideIcon } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
  path?: string;
  icon: LucideIcon;
}

const categories: FilterOption[] = [{
  label: "הכל",
  value: "all",
  icon: Plane
}, {
  label: "הלבשה לטייס",
  value: "pilot-clothing",
  icon: Shirt
}, {
  label: "ציוד לטייס",
  value: "pilot-equipment",
  icon: Package
}, {
  label: "שעת טיסה מוזל",
  value: "discounted-flight",
  path: "/discounted-flight",
  icon: Clock
}, {
  label: "כניסה להגרלה",
  value: "raffle-entry",
  path: "/raffle-entry",
  icon: Ticket
}];
interface FilterBarProps {
  onFilterChange: (category: string) => void;
}
const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const handleFilterClick = (value: string) => {
    setActiveFilter(value);
    onFilterChange(value);
  };
  return <div className="flex overflow-x-auto pb-2 hide-scrollbar">
      <div className="flex gap-3 py-3 px-4 justify-center flex-wrap">
        {categories.map(category => {
          const Icon = category.icon;
          const isActive = activeFilter === category.value;
          
          return category.path ? (
            <Button 
              key={category.value} 
              variant={isActive ? "default" : "outline"}
              size="lg"
              className={`
                group relative overflow-hidden
                bg-gradient-to-r from-primary/90 to-primary
                hover:from-primary hover:to-primary/80
                text-primary-foreground
                border-2 border-primary/20
                rounded-2xl
                px-6 py-6
                transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:shadow-primary/25
                ${isActive ? 'ring-2 ring-primary ring-offset-2 scale-105' : ''}
              `}
              asChild
            >
              <Link to={category.path} className="flex items-center gap-3">
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="font-medium">{category.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </Button>
          ) : (
            <Button 
              key={category.value} 
              variant={isActive ? "default" : "outline"}
              size="lg"
              onClick={() => handleFilterClick(category.value)}
              className={`
                group relative overflow-hidden
                bg-gradient-to-r from-primary/90 to-primary
                hover:from-primary hover:to-primary/80
                text-primary-foreground
                border-2 border-primary/20
                rounded-2xl
                px-6 py-6
                transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:shadow-primary/25
                ${isActive ? 'ring-2 ring-primary ring-offset-2 scale-105' : ''}
              `}
            >
              <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span className="font-medium">{category.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          );
        })}
      </div>
    </div>;
};
export default FilterBar;