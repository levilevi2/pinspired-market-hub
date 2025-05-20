
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignupForm from "./SignupForm";

const CustomHeader: React.FC = () => {
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  
  const openSignupDialog = () => {
    console.log("Opening signup dialog");
    setShowSignupDialog(true);
  };
  
  return (
    <header className="bg-blue-800/40 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="font-bold text-xl text-white">
          אקדמיית הטיסה
        </Link>
        
        <div className="flex items-center space-x-4">
          <CartIcon />
          
          <Button 
            variant="ghost" 
            onClick={openSignupDialog}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            כניסה / הרשמה
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
