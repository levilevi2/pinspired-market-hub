
import { useState } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import SiteMap from "@/components/SiteMap";
import { Users, Percent } from "lucide-react";
import { Progress } from "@/components/ui/progress"; 

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dynamic values for friends and raffle participants
  const [friendsCount] = useState(842); // Example value
  const [raffleParticipants] = useState(1560); // Example value
  const maxRaffleParticipants = 3000;
  const raffleProgress = Math.round((raffleParticipants / maxRaffleParticipants) * 100);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-900/70">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">מוצרים מומלצים</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <div className="flex items-center mb-3 md:mb-0">
            <div className="bg-pinterest-purple/20 p-2 rounded-full mr-2">
              <Users size={20} className="text-pinterest-purple" />
            </div>
            <div className="text-white">
              <p className="text-sm">מספר חברים</p>
              <p className="font-semibold">{friendsCount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex flex-col w-full md:w-1/2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <div className="bg-pinterest-purple/20 p-2 rounded-full mr-2">
                  <Percent size={20} className="text-pinterest-purple" />
                </div>
                <div className="text-white">
                  <p className="text-sm">משתתפים בהגרלה</p>
                </div>
              </div>
              <span className="text-white text-sm">{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</span>
            </div>
            <Progress 
              value={raffleProgress} 
              className="h-2 bg-gray-300/30" 
            />
          </div>
        </div>
        
        <FilterBar onFilterChange={setActiveFilter} />
        
        <div className="mt-6">
          <ProductGrid filter={activeFilter} searchQuery={searchQuery} />
        </div>
      </main>
      
      <SiteMap />
    </div>
  );
};

export default Index;
