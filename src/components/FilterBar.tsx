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
      <div className="flex gap-3 py-3 px-4 justify-center flex-wrap bg-card/60 backdrop-blur-md rounded-2xl border border-border/40">
        {categories.map(category => {
          const Icon = category.icon;
          const isActive = activeFilter === category.value;
          
          const buttonClasses = `
            group relative overflow-hidden
            ${isActive 
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
              : 'bg-secondary/60 text-foreground hover:bg-secondary/80'
            }
            border border-border/30
            rounded-xl
            px-5 py-3
            transition-all duration-300
            hover:scale-105
            ${isActive ? 'ring-2 ring-primary/50 ring-offset-2 ring-offset-background scale-105' : ''}
          `;
          
          return category.path ? (
            <Button 
              key={category.value} 
              variant="ghost"
              size="lg"
              className={buttonClasses}
              asChild
            >
              <Link to={category.path} className="flex items-center gap-2">
                <Icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="font-medium text-sm">{category.label}</span>
              </Link>
            </Button>
          ) : (
            <Button 
              key={category.value} 
              variant="ghost"
              size="lg"
              onClick={() => handleFilterClick(category.value)}
              className={buttonClasses}
            >
              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-medium text-sm">{category.label}</span>
            </Button>
          );
        })}
      </div>
    </div>;
};
export default FilterBar;