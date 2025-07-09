
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card 
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full" 
      onClick={() => onClick(product)} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full object-cover aspect-[3/2] transition-transform duration-300" 
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }} 
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute top-3 right-3 rounded-full bg-background/80 hover:bg-background p-2 ${
            isBookmarked ? "text-primary" : "text-muted-foreground"
          }`} 
          onClick={handleBookmarkClick}
        >
          <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
        </Button>
      </div>
      <div dir="rtl" className="p-4">
        <h3 className="font-semibold text-foreground text-base line-clamp-2 mb-2">{product.title}</h3>
        <p className="text-primary font-bold text-lg">{`₪${product.price.toFixed(2)}`}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
