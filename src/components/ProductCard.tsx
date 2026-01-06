
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
      className="bg-white/[0.08] backdrop-blur-2xl border border-white/15 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-white/[0.12] hover:-translate-y-4 hover:border-white/25 transition-all duration-500 ease-out cursor-pointer h-full group relative" 
      onClick={() => onClick(product)} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-3xl" />
      
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute top-3 right-3 rounded-full bg-white/[0.12] backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-white/30 w-10 h-10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 ${
            isBookmarked ? "text-primary" : "text-white/80"
          }`} 
          onClick={handleBookmarkClick}
        >
          <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
        </Button>
      </div>
      <div dir="rtl" className="p-5 bg-gradient-to-b from-white/[0.02] to-white/[0.06] relative">
        <h3 className="font-medium text-white/95 text-sm line-clamp-2 mb-3 leading-relaxed drop-shadow-sm">{product.title}</h3>
        <p className="text-primary font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">{`₪${product.price.toFixed(2)}`}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
