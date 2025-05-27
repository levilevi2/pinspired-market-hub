
import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onClose: () => void;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full max-w-md">
      <Input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="חפש מוצרים..."
        className="pl-10 pr-4 py-2 w-full rounded-full bg-blue-800/50 border-blue-400 focus-visible:ring-blue-300 text-white"
        dir="rtl"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute left-0 top-0 hover:bg-transparent text-white"
        onClick={onClose}
      >
        <X size={20} />
      </Button>
    </form>
  );
};

export default SearchBar;
