
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bookmark, Share, ShoppingCart, PlusIcon, MinusIcon } from "lucide-react";
import { useState } from "react";
import { Product } from "./ProductCard";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  isOpen, 
  onClose 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "הוסף לסל",
      description: `${product.title} נוסף לסל הקניות`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    navigate("/cart");
  };

  const incrementQuantity = () => {
    if ((product.category === "discounted-flight" && quantity < 2) || product.category !== "discounted-flight") {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle dir="rtl" className="text-xl font-bold">
            {product.title}
          </DialogTitle>
          <DialogDescription dir="rtl" className="text-pinterest-purple font-bold text-lg">
            ₪{product.price.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-auto rounded-lg aspect-[3/4] object-cover" 
            />
          </div>
          
          <div dir="rtl">
            <h3 className="font-semibold text-lg mb-2">תיאור המוצר</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">כמות:</span>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="px-2"
                  >
                    <MinusIcon size={16} />
                  </Button>
                  <span className="px-4">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={incrementQuantity}
                    disabled={product.category === "discounted-flight" && quantity >= 2}
                    className="px-2"
                  >
                    <PlusIcon size={16} />
                  </Button>
                </div>
              </div>
              
              {product.category === "discounted-flight" && (
                <p className="text-xs text-gray-500 mb-2">* ניתן לרכוש עד שתי שעות טיסה בהזמנה אחת</p>
              )}
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-pinterest-purple hover:bg-pinterest-dark-purple"
                onClick={handleBuyNow}
              >
                רכישה מיידית
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-gray-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
                <span>הוסף לסל</span>
              </Button>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2 border-gray-300"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark 
                    size={18} 
                    className={isBookmarked ? "text-pinterest-purple" : ""} 
                    fill={isBookmarked ? "#8B5CF6" : "none"} 
                  />
                  <span>שמור</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2 border-gray-300"
                >
                  <Share size={18} />
                  <span>שתף</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
