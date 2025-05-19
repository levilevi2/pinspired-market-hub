
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Bookmark, Grid3x3 } from "lucide-react";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-blue-900/90 backdrop-blur-md shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-pinterest-purple mr-4">PinShop</h1>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" className="text-white hover:text-pinterest-purple">
            הבית
          </Button>
          <Button variant="ghost" className="text-white hover:text-pinterest-purple">
            קטגוריות
          </Button>
          <Button variant="ghost" className="text-white hover:text-pinterest-purple">
            מבצעים
          </Button>
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        {showSearch ? (
          <div className="animate-fade-in">
            <SearchBar onClose={() => setShowSearch(false)} />
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSearch(true)}
            className="transition-all hover:text-pinterest-purple text-white"
          >
            <Search size={20} />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="transition-all hover:text-pinterest-purple text-white">
          <Bookmark size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden transition-all hover:text-pinterest-purple text-white">
          <Grid3x3 size={20} />
        </Button>
        <Button className="hidden md:inline-flex bg-pinterest-purple hover:bg-pinterest-dark-purple text-white">
          כניסה / הרשמה
        </Button>
      </div>
    </header>
  );
};

export default Header;
