
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import SignupForm from "./SignupForm";
import { Home, Grid, Search, Percent, Bookmark, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CustomHeader: React.FC = () => {
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [user, setUser] = useState<{ name: string; isLoggedIn: boolean } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]); // Re-check on location change
  
  const openSignupDialog = () => {
    console.log("Opening signup dialog");
    setShowSignupDialog(true);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  
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
  
  return (
    <TooltipProvider>
      <header className="bg-blue-800/40 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-white">
              אקדמיית הטיסה
            </Link>
            {user?.isLoggedIn && (
              <span className="text-white text-sm ml-4 hidden sm:inline-block">
                שלום, {user.name}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`transition-all hover:text-pinterest-purple text-white ${location.pathname === "/" ? "text-pinterest-purple" : ""}`}
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
                    className="transition-all hover:text-pinterest-purple text-white"
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
                    className={`transition-all hover:text-pinterest-purple text-white ${location.pathname === "/discounted-flight" ? "text-pinterest-purple" : ""}`}
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
                  className="transition-all hover:text-pinterest-purple text-white"
                >
                  <Bookmark size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>פריטים שמורים</p>
              </TooltipContent>
            </Tooltip>
            
            <CartIcon />
            
            {user?.isLoggedIn ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout} 
                    className="text-white hover:text-gray-200 transition-colors duration-200"
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
                <Button 
                  variant="ghost" 
                  onClick={handleLoginClick}
                  className="text-white hover:text-gray-200 transition-colors duration-200 ml-2"
                >
                  כניסה
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={openSignupDialog}
                  className="text-white border-white hover:bg-white/10 transition-colors duration-200"
                >
                  הרשמה
                </Button>
              </>
            )}
            
            {/* Hidden button for triggering signup from login page */}
            <Button
              id="signup-trigger"
              className="hidden"
              onClick={openSignupDialog}
            >
              Hidden Signup Trigger
            </Button>
          </div>
        </div>

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

export default CustomHeader;
