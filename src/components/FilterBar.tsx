import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
interface FilterOption {
  label: string;
  value: string;
  path?: string;
}
const categories: FilterOption[] = [{
  label: "הכל",
  value: "all"
}, {
  label: "הלבשה לטייס",
  value: "pilot-clothing"
}, {
  label: "ציוד לטייס",
  value: "pilot-equipment"
}, {
  label: "שעת טיסה מוזל",
  value: "discounted-flight",
  path: "/discounted-flight"
}, {
  label: "כניסה להגרלה",
  value: "raffle-entry",
  path: "/raffle-entry"
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
      <div className="flex space-x-2 py-[9px] px-[101px] mx-[13px] my-0">
        {categories.map(category => category.path ? <Button key={category.value} variant={activeFilter === category.value ? "default" : "outline"} size="sm" className={`text-sm whitespace-nowrap ${activeFilter === category.value ? "bg-pinterest-purple hover:bg-pinterest-dark-purple" : "hover:border-pinterest-purple hover:text-pinterest-purple"}`} asChild>
              <Link to={category.path}>{category.label}</Link>
            </Button> : <Button key={category.value} variant={activeFilter === category.value ? "default" : "outline"} size="sm" onClick={() => handleFilterClick(category.value)} className="text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-3xl">
              {category.label}
            </Button>)}
      </div>
    </div>;
};
export default FilterBar;