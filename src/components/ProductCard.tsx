
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
      className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:bg-card/90 hover:-translate-y-2 hover:border-primary/30 transition-all duration-500 ease-out cursor-pointer h-full group" 
      onClick={() => onClick(product)} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-105" 
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 w-10 h-10 shadow-sm ${
            isBookmarked ? "text-primary" : "text-muted-foreground"
          }`} 
          onClick={handleBookmarkClick}
        >
          <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
        </Button>
      </div>
      <div dir="rtl" className="p-6">
        <h3 className="font-medium text-foreground text-base line-clamp-2 mb-3 leading-relaxed">{product.title}</h3>
        <p className="text-primary font-semibold text-lg">{`₪${product.price.toFixed(2)}`}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
