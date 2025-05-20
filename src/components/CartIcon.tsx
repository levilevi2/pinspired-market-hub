
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CartIcon: React.FC = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <Link to="/cart">
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative text-white"
        aria-label="Shopping cart"
      >
        <ShoppingCart size={20} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pinterest-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default CartIcon;
