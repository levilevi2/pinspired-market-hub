
import React from "react";
import { Link } from "react-router-dom";
import { Map } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SiteMap: React.FC = () => {
  const siteLinks = [
    { name: "דף הבית", path: "/" },
    { name: "הזדמנות להגרלה", path: "/raffle-entry" },
    { name: "טיסות מוזלות", path: "/discounted-flight" },
    { name: "מדריכים", path: "/instructor-details" },
    { name: "סל הקניות", path: "/cart" },
  ];

  return (
    <footer className="w-full bg-blue-900/70 text-white py-8 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-4">
          <Map className="h-5 w-5 ml-2" />
          <h2 className="text-lg font-semibold">מפת האתר</h2>
        </div>
        
        <Separator className="bg-white/20 mb-4" />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-right">
          {siteLinks.map((link) => (
            <div key={link.path} className="mb-2">
              <Link 
                to={link.path} 
                className="hover:text-blue-300 transition-colors duration-200"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>
        
        <Separator className="bg-white/20 my-4" />
        
        <div className="text-center text-sm text-white/70">
          <p>© 2025 אקדמיית הטיסה - כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteMap;
