
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Grid, Search, Percent, Bookmark, ShoppingCart, Info, Users, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import SearchBar from "./SearchBar";

interface MobileNavigationProps {
  onSearch?: (query: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  const navItems = [
    { to: "/", icon: Home, label: "דף הבית" },
    { to: "/categories", icon: Grid, label: "קטגוריות" },
    { to: "/about", icon: Info, label: "אודות האתר" },
    { to: "/community-updates", icon: Users, label: "עדכונים בקהילה" },
    { to: "/discounted-flight", icon: Percent, label: "שעות טיסה מוזלות" },
  ];

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
    setShowSearch(false);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-blue-900 to-blue-800 border-l border-blue-700">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-blue-700">
              <h2 className="text-xl font-bold text-white">תפריט</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="flex-1 py-4">
              <div className="space-y-2 px-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowSearch(true)}
                  className="w-full justify-start text-white hover:bg-blue-800"
                >
                  <Search size={20} className="ml-3" />
                  חיפוש
                </Button>

                {navItems.map((item) => (
                  <Link key={item.to} to={item.to} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-white hover:bg-blue-800 ${
                        location.pathname === item.to ? "bg-blue-800" : ""
                      }`}
                    >
                      <item.icon size={20} className="ml-3" />
                      {item.label}
                    </Button>
                  </Link>
                ))}

                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-blue-800"
                >
                  <Bookmark size={20} className="ml-3" />
                  פריטים שמורים
                </Button>

                <Link to="/cart" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start relative text-white hover:bg-blue-800 ${
                      location.pathname === "/cart" ? "bg-blue-800" : ""
                    }`}
                  >
                    <ShoppingCart size={20} className="ml-3" />
                    עגלת קניות
                    {cartItemCount > 0 && (
                      <span className="absolute left-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {showSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="absolute top-4 left-4 right-4">
            <SearchBar 
              onClose={() => setShowSearch(false)} 
              onSearch={handleSearch}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
