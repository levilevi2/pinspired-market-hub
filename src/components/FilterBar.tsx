
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FilterOption {
  label: string;
  value: string;
}

const categories: FilterOption[] = [
  { label: "הכל", value: "all" },
  { label: "הלבשה לטייס", value: "pilot-clothing" },
  { label: "ציוד לטייס", value: "pilot-equipment" },
  { label: "שעת טיסה מוזל", value: "discounted-flight" },
  { label: "כניסה להגרלה", value: "raffle-entry" },
];

interface FilterBarProps {
  onFilterChange: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (value: string) => {
    setActiveFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="flex overflow-x-auto pb-2 hide-scrollbar">
      <div className="flex space-x-2 mx-auto py-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={activeFilter === category.value ? "default" : "outline"}
            size="sm"
            className={`text-sm whitespace-nowrap ${
              activeFilter === category.value
                ? "bg-pinterest-purple hover:bg-pinterest-dark-purple"
                : "hover:border-pinterest-purple hover:text-pinterest-purple"
            }`}
            onClick={() => handleFilterClick(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
