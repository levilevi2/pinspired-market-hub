
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bookmark, Share } from "lucide-react";
import { useState } from "react";
import { Product } from "./ProductCard";

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
  
  if (!product) return null;

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
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-pinterest-purple hover:bg-pinterest-dark-purple"
              >
                הוסף לסל הקניות
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
