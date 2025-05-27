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
  return <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer h-full" onClick={() => onClick(product)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative">
        <img src={product.image} alt={product.title} className="w-full object-cover aspect-[3/2] transition-transform duration-300" style={{
        transform: isHovered ? "scale(1.03)" : "scale(1)"
      }} />
        <Button variant="ghost" size="icon" className={`absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white p-1.5 ${isBookmarked ? "text-black" : "text-gray-600"}`} onClick={handleBookmarkClick}>
          <Bookmark size={18} fill={isBookmarked ? "#000000" : "none"} />
        </Button>
      </div>
      <div dir="rtl" className="p-3 py-[2px] px-[14px] mx-0 bg-sky-50 rounded-none">
        <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
        <p className="text-black font-bold mt-1">{`₪${product.price.toFixed(2)}`}</p>
      </div>
    </Card>;
};
export default ProductCard;