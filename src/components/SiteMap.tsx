import React from "react";
import { Link } from "react-router-dom";
import { Map } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const SiteMap: React.FC = () => {
  const siteLinks = [{
    name: "דף הבית",
    path: "/"
  }, {
    name: "הזדמנות להגרלה",
    path: "/raffle-entry"
  }, {
    name: "טיסות מוזלות",
    path: "/discounted-flight"
  }, {
    name: "מדריכים",
    path: "/instructor-details"
  }, {
    name: "סל הקניות",
    path: "/cart"
  }, {
    name: "מפת אתר חזותית",
    path: "/site-map-visual"
  }];
  return <footer className="w-full py-8 mt-auto bg-card/80 backdrop-blur-sm border-t border-border/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-4">
          <Map className="h-5 w-5 ml-2 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">מפת האתר</h2>
        </div>
        
        <Separator className="bg-border/30 mb-4" />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-right">
          {siteLinks.map(link => <div key={link.path} className="mb-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors duration-200">
              <Link to={link.path} className="text-foreground hover:text-primary transition-colors duration-200">
                {link.name}
              </Link>
            </div>)}
        </div>
        
        <Separator className="bg-border/30 my-4" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 אקדמיית הטיסה - כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>;
};
export default SiteMap;