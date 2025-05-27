import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import SiteMap from "@/components/SiteMap";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
import { Users, Percent, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
const Index = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic values for friends and raffle participants
  const [friendsCount] = useState(842); // Example value
  const [raffleParticipants] = useState(1560); // Example value
  const maxRaffleParticipants = 3000;
  const raffleProgress = Math.round(raffleParticipants / maxRaffleParticipants * 100);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleViewPrizes = () => {
    navigate("/prizes");
  };
  return <div className="min-h-screen flex flex-col relative">
      <AnimatedWorldMap />
      <Header onSearch={handleSearch} />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-6 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">מוצרים מומלצים</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 glass-card p-6 float-animation py-0 mx-[240px] my-0 px-[18px] rounded-2xl">
          <div className="flex items-center mb-3 md:mb-0">
            <div className="bg-white/20 p-3 rounded-full mr-3 backdrop-blur-sm">
              <Users size={24} className="text-white" />
            </div>
            <div className="text-white">
              <p className="text-sm opacity-90">מספר חברים</p>
              <p className="font-semibold text-lg">{friendsCount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex flex-col w-full md:w-1/2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-3 backdrop-blur-sm">
                  <Percent size={24} className="text-white" />
                </div>
                <div className="text-white">
                  <p className="text-sm opacity-90">משתתפים בהגרלה</p>
                </div>
              </div>
              <span className="text-white text-sm font-medium">{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={raffleProgress} className="h-3 bg-white/20 flex-grow" />
              <Button onClick={handleViewPrizes} className="modern-button bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 flex items-center gap-2 text-sm py-2 h-auto text-white" size="sm">
                <Trophy size={16} />
                לצפיה בפרסים
              </Button>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-4 mb-6 py-0 px-0 mx-[240px] my-0">
          <FilterBar onFilterChange={setActiveFilter} />
        </div>
        
        <div className="mt-6">
          <ProductGrid filter={activeFilter} searchQuery={searchQuery} />
        </div>
      </main>
      
      <SiteMap />
    </div>;
};
export default Index;