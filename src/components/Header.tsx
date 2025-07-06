import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Home, Grid, Search, Percent, Bookmark, LogOut, Info, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import SearchBar from "./SearchBar";
import MobileNavigation from "./MobileNavigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignupForm from "./SignupForm";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearch
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    isLoggedIn: boolean;
  } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    getTotalItems
  } = useCart();
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
      title: "התנתקת בהצלחה"
    });
    if (location.pathname === '/cart' || location.pathname === '/discounted-flight') {
      navigate('/');
    }
  };
  const openSignupDialog = () => {
    setShowSignupDialog(true);
  };
  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };
  return <TooltipProvider>
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl sm:text-3xl font-black text-white mr-4 tracking-tight">
            FLY<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">ACADEMY</span>
          </Link>
          {user?.isLoggedIn && (
            <span className="text-gray-300 text-sm md:text-base ml-2 hidden sm:inline font-medium">
              Welcome, {user.name}
            </span>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNavigation onSearch={onSearch} />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          {showSearch ? <div className="animate-fade-in">
              <SearchBar onClose={() => setShowSearch(false)} onSearch={handleSearch} />
            </div> : <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="transition-all hover:bg-gray-800 text-white" aria-label="Search">
                  <Search size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>חיפוש</p>
              </TooltipContent>
            </Tooltip>}

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/">
                <Button variant="ghost" size="icon" className={`transition-all hover:bg-gray-800 text-white ${location.pathname === "/" ? "bg-gray-800" : ""}`} aria-label="Home">
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
                <Button variant="ghost" size="icon" className="transition-all hover:text-black text-white" aria-label="Categories">
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
              <Link to="/about">
                <Button variant="ghost" size="icon" className={`transition-all hover:text-black text-white ${location.pathname === "/about" ? "text-black" : ""}`} aria-label="About">
                  <Info size={20} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>אודות האתר</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/community-updates">
                <Button variant="ghost" size="icon" className={`transition-all hover:text-black text-white ${location.pathname === "/community-updates" ? "text-black" : ""}`} aria-label="Community Updates">
                  <Users size={20} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>עדכונים בקהילה</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/discounted-flight">
                <Button variant="ghost" size="icon" className={`transition-all hover:text-black text-white ${location.pathname === "/discounted-flight" ? "text-black" : ""}`} aria-label="Discounted Flight">
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
              <Button variant="ghost" size="icon" className="transition-all hover:text-black text-white" aria-label="Saved items">
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
                <Button variant="ghost" size="icon" className={`relative transition-all hover:text-black text-white ${location.pathname === "/cart" ? "text-black" : ""}`} aria-label="Shopping cart">
                  <ShoppingCart size={20} />
                  {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>עגלת קניות</p>
            </TooltipContent>
          </Tooltip>

          {user?.isLoggedIn ? <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="transition-all hover:bg-gray-800 text-white" aria-label="Logout">
                  <LogOut size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>התנתק</p>
              </TooltipContent>
            </Tooltip> : <>
              <Link to="/login">
                <Button className="hidden lg:inline-flex bg-white hover:bg-gray-100 text-black font-semibold px-6">
                  LOGIN
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={openSignupDialog} 
                className="nike-accent-button border-none font-bold tracking-wide"
              >
                SIGN UP
              </Button>
            </>}
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
    </TooltipProvider>;
};
export default Header;
