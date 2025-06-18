import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import SiteMap from "@/components/SiteMap";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
import FlightCoursesDrawer from "@/components/FlightCoursesDrawer";
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
    console.log("Navigating to prizes page");
    navigate("/prizes");
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedWorldMap />
      <Header onSearch={handleSearch} />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 glass-card p-6 float-animation py-0 mx-[120px] my-0 px-[18px] rounded-2xl">
          <div className="flex items-center mb-3 md:mb-0 px-0 py-0 mx-0">
            <div className="bg-white/20 p-3 rounded-full mr-3 backdrop-blur-sm">
              <Users size={24} className="text-white" />
            </div>
            <div className="text-white">
              <p className="text-sm opacity-90">מספר חברים</p>
              <p className="font-semibold text-lg">{friendsCount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex flex-col w-full md:w-2/3 my-[12px] mx-0 px-[20px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full mr-3 backdrop-blur-sm">
                  <Percent size={24} className="text-white" />
                </div>
                <div className="text-white">
                  <p className="text-sm opacity-90">משתתפים בהגרלה</p>
                  <p className="text-lg font-bold">{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-white text-center">
                <p className="text-2xl font-bold">{raffleProgress}%</p>
                <p className="text-xs opacity-80">הושלם</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-0 py-0 mx-0">
              <Progress value={raffleProgress} className="h-4 bg-white/20 flex-grow" />
              <Button 
                onClick={handleViewPrizes} 
                size="sm" 
                className="modern-button bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 flex items-center gap-2 py-2 h-auto text-white text-sm px-[20px] cursor-pointer"
                type="button"
              >
                <Trophy size={16} />
                לצפיה בפרסים
              </Button>
            </div>
            <div className="flex justify-between text-white text-xs mt-2 opacity-70">
              <span>התחלה</span>
              <span>יעד: {maxRaffleParticipants.toLocaleString()} משתתפים</span>
            </div>
          </div>
        </div>

        {/* Flight Courses Drawer */}
        <div className="flex justify-center mb-6">
          <FlightCoursesDrawer />
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">מוצרים מומלצים</h1>
        
        <div className="glass-card p-4 mb-6 px-0 mx-[240px] py-[4px] my-[7px]">
          <FilterBar onFilterChange={setActiveFilter} />
        </div>
        
        <div className="mt-6">
          <ProductGrid filter={activeFilter} searchQuery={searchQuery} />
        </div>
      </main>
      
      <SiteMap />
    </div>
  );
};

export default Index;
