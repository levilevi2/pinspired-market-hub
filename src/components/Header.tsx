
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Home, Grid, Search, Percent, Bookmark } from "lucide-react";
import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 bg-blue-900/90 backdrop-blur-md shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-pinterest-purple mr-4">PinShop</Link>
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
            aria-label="Search"
          >
            <Search size={20} />
          </Button>
        )}

        <Link to="/">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`transition-all hover:text-pinterest-purple text-white ${location.pathname === "/" ? "text-pinterest-purple" : ""}`}
            aria-label="Home"
          >
            <Home size={20} />
          </Button>
        </Link>

        <Link to="/categories">
          <Button 
            variant="ghost" 
            size="icon" 
            className="transition-all hover:text-pinterest-purple text-white"
            aria-label="Categories"
          >
            <Grid size={20} />
          </Button>
        </Link>

        <Link to="/discounted-flight">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`transition-all hover:text-pinterest-purple text-white ${location.pathname === "/discounted-flight" ? "text-pinterest-purple" : ""}`}
            aria-label="Discounted Flight"
          >
            <Percent size={20} />
          </Button>
        </Link>

        <Button 
          variant="ghost" 
          size="icon" 
          className="transition-all hover:text-pinterest-purple text-white"
          aria-label="Saved items"
        >
          <Bookmark size={20} />
        </Button>

        <Link to="/cart">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`transition-all hover:text-pinterest-purple text-white ${location.pathname === "/cart" ? "text-pinterest-purple" : ""}`}
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
          </Button>
        </Link>

        <Link to="/login">
          <Button className="hidden md:inline-flex bg-pinterest-purple hover:bg-pinterest-dark-purple text-white">
            כניסה / הרשמה
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
