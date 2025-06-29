
import { useState, useEffect } from "react";
import ProductCard, { Product } from "./ProductCard";
import ProductModal from "./ProductModal";

interface ProductGridProps {
  filter: string;
  searchQuery: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ filter, searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Mock products data
    const mockProducts: Product[] = [
      {
        id: 1,
        title: "טבעת יהלום רוזגולד",
        price: 759.99,
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        category: "jewelry",
        description: "טבעת יהלום יוקרתית בציפוי רוזגולד. מתאימה לאירועים מיוחדים."
      },
      {
        id: 2,
        title: "לפטופ אולטרה דק",
        price: 4299.99,
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        category: "electronics",
        description: "לפטופ יוקרתי דק במיוחד עם מסך מגע ומעבד חדשני."
      },
      {
        id: 3,
        title: "שמלת ערב שחורה",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        category: "fashion",
        description: "שמלת ערב שחורה אלגנטית בגזרה מחמיאה."
      },
      {
        id: 4,
        title: "אוזניות בלוטות' פרימיום",
        price: 599.99,
        image: "/lovable-uploads/3c217c8e-891c-4cfb-85f0-cc4f307ca681.png",
        category: "electronics",
        description: "אוזניות בלוטות' עם ביטול רעשים אקטיבי וסאונד איכותי."
      },
      {
        id: 5,
        title: "מנורת לילה מעוצבת",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        category: "home-decor",
        description: "מנורת לילה מעוצבת עם אפשרות לשינוי צבעים."
      },
      {
        id: 6,
        title: "סט איפור מקצועי",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        category: "beauty",
        description: "סט איפור מקצועי הכולל את כל המוצרים הדרושים למראה מושלם."
      },
      {
        id: 7,
        title: "חולצת כותנה אורגנית",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        category: "fashion",
        description: "חולצת כותנה אורגנית איכותית בגזרה קלאסית."
      },
      {
        id: 8,
        title: "כרית נוי מעוצבת",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        category: "home-decor",
        description: "כרית נוי מעוצבת לסלון או לחדר השינה."
      },
      {
        id: 9,
        title: "שעת טיסה מוזלת - בסיסית",
        price: 500.00,
        image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e",
        category: "discounted-flight",
        description: "שעת טיסה מוזלת עם מדריך מתחיל. מתאימה לטייסים בתחילת דרכם."
      },
      {
        id: 10,
        title: "שעת טיסה מוזלת - מתקדמת",
        price: 700.00,
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
        category: "discounted-flight",
        description: "שעת טיסה מוזלת עם מדריך בכיר. מתאימה לטייסים מתקדמים."
      }
    ];

    setProducts(mockProducts);
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter((product) => {
    const matchesFilter = filter === "all" || product.category === filter;
    const matchesSearch = searchQuery === "" || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="animate-fade-in" style={{animationDelay: `${product.id * 0.05}s`}}>
            <ProductCard product={product} onClick={handleProductClick} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-xl font-medium text-gray-600 mb-2">לא נמצאו מוצרים</p>
          <p className="text-gray-500">נסה לחפש משהו אחר או לשנות את הסינון</p>
        </div>
      )}

      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ProductGrid;
