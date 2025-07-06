
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

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card 
      className="bg-white/5 border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full backdrop-blur-sm hover:bg-white/10 hover:border-white/20" 
      onClick={() => onClick(product)} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full object-cover aspect-[3/2] transition-transform duration-500" 
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute top-3 right-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm p-2 ${isBookmarked ? "text-orange-500" : "text-white"}`} 
          onClick={handleBookmarkClick}
        >
          <Bookmark size={18} fill={isBookmarked ? "#f97316" : "none"} />
        </Button>
      </div>
      <div dir="rtl" className="p-4 bg-gradient-to-b from-white/10 to-white/5">
        <h3 className="font-bold text-white text-base line-clamp-1 mb-2">{product.title}</h3>
        <p className="text-orange-500 font-black text-lg">{`₪${product.price.toFixed(2)}`}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
