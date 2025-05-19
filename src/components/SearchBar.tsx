
import { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="relative flex items-center w-full max-w-md">
      <Input
        ref={inputRef}
        type="text"
        placeholder="חפש מוצרים..."
        className="pl-10 pr-4 py-2 w-full rounded-full border-pinterest-light-purple focus-visible:ring-pinterest-purple"
        dir="rtl"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-0 hover:bg-transparent"
        onClick={onClose}
      >
        <X size={20} className="text-gray-500" />
      </Button>
    </div>
  );
};

export default SearchBar;
