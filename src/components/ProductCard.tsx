
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
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:bg-white/10 hover:-translate-y-3 hover:border-white/20 transition-all duration-500 ease-out cursor-pointer h-full group" 
      onClick={() => onClick(product)} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute top-3 right-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 w-9 h-9 shadow-lg ${
            isBookmarked ? "text-primary" : "text-white/70"
          }`} 
          onClick={handleBookmarkClick}
        >
          <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
        </Button>
      </div>
      <div dir="rtl" className="p-5 bg-gradient-to-b from-transparent to-white/5">
        <h3 className="font-medium text-white/90 text-sm line-clamp-2 mb-2 leading-relaxed">{product.title}</h3>
        <p className="text-primary font-bold text-base">{`₪${product.price.toFixed(2)}`}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
