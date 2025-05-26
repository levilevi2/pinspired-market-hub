
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Home, Grid, Search, Percent, Bookmark, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import SearchBar from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignupForm from "./SignupForm";
import { useCart } from "@/contexts/CartContext";

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [user, setUser] = useState<{ name: string; isLoggedIn: boolean } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

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
    <TooltipProvider>
      <header className="sticky top-0 z-10 bg-blue-900/90 backdrop-blur-md shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-black mr-4">PinShop</Link>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowSearch(true)}
                  className="transition-all hover:text-black text-white"
                  aria-label="Search"
                >
                  <Search size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>חיפוש</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`transition-all hover:text-black text-white ${location.pathname === "/" ? "text-black" : ""}`}
                  aria-label="Home"
                >
                  <Home size={20} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>דף הבית</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/categories">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="transition-all hover:text-black text-white"
                  aria-label="Categories"
                >
                  <Grid size={20} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>קטגוריות</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/discounted-flight">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`transition-all hover:text-black text-white ${location.pathname === "/discounted-flight" ? "text-black" : ""}`}
                  aria-label="Discounted Flight"
                >
                  <Percent size={20} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>שעות טיסה מוזלות</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="transition-all hover:text-black text-white"
                aria-label="Saved items"
              >
                <Bookmark size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>פריטים שמורים</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/cart">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`relative transition-all hover:text-black text-white ${location.pathname === "/cart" ? "text-black" : ""}`}
                  aria-label="Shopping cart"
                >
                  <ShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>עגלת קניות</p>
            </TooltipContent>
          </Tooltip>

          {user?.isLoggedIn ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout} 
                  className="transition-all hover:text-black text-white"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>התנתק</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <Link to="/login">
                <Button className="hidden md:inline-flex bg-black hover:bg-gray-800 text-white">
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
    </TooltipProvider>
  );
};

export default Header;
