
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignupForm from "./SignupForm";
import { Home, Grid, Search, Percent, Bookmark } from "lucide-react";

const CustomHeader: React.FC = () => {
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const openSignupDialog = () => {
    console.log("Opening signup dialog");
    setShowSignupDialog(true);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  
  return (
    <header className="bg-blue-800/40 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="font-bold text-xl text-white">
          אקדמיית הטיסה
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`transition-all hover:text-pinterest-purple text-white ${location.pathname === "/" ? "text-pinterest-purple" : ""}`}
            >
              <Home size={20} />
            </Button>
          </Link>

          <Link to="/categories">
            <Button 
              variant="ghost" 
              size="icon" 
              className="transition-all hover:text-pinterest-purple text-white"
            >
              <Grid size={20} />
            </Button>
          </Link>

          <Link to="/discounted-flight">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`transition-all hover:text-pinterest-purple text-white ${location.pathname === "/discounted-flight" ? "text-pinterest-purple" : ""}`}
            >
              <Percent size={20} />
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            className="transition-all hover:text-pinterest-purple text-white"
          >
            <Bookmark size={20} />
          </Button>
          
          <CartIcon />
          
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
  );
};

export default CustomHeader;
