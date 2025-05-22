
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Home, Grid, Search, Percent, Bookmark, LogOut } from "lucide-react";
import SearchBar from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignupForm from "./SignupForm";

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [user, setUser] = useState<{ name: string; isLoggedIn: boolean } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]); // Re-check on location change to update header after login/logout

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "התנתקת בהצלחה",
    });
    if (location.pathname === '/cart' || location.pathname === '/discounted-flight') {
      navigate('/');
    }
  };

  const openSignupDialog = () => {
    setShowSignupDialog(true);
  };

  return (
    <header className="sticky top-0 z-10 bg-blue-900/90 backdrop-blur-md shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-pinterest-purple mr-4">PinShop</Link>
        {user?.isLoggedIn && (
          <span className="text-white text-sm md:text-base ml-2">
            שלום, {user.name}
          </span>
        )}
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

        {user?.isLoggedIn ? (
          <Button 
            variant="ghost"
            size="icon"
            onClick={handleLogout} 
            className="transition-all hover:text-pinterest-purple text-white"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button className="hidden md:inline-flex bg-pinterest-purple hover:bg-pinterest-dark-purple text-white">
                כניסה
              </Button>
            </Link>
            <Button 
              variant="outline"
              onClick={openSignupDialog}
              className="text-white border-white hover:bg-white/10 transition-colors duration-200"
            >
              הרשמה
            </Button>
          </>
        )}
      </div>
      
      {/* Signup Dialog */}
      <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">הרשמה לאקדמיית הטיסה</DialogTitle>
          </DialogHeader>
          <SignupForm onClose={() => setShowSignupDialog(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
