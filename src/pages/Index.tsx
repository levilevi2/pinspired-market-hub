
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import SiteMap from "@/components/SiteMap";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
import FlightCoursesDrawer from "@/components/FlightCoursesDrawer";
import SignupForm from "@/components/SignupForm";
import { Users, Percent, Trophy, UserPlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupTab, setSignupTab] = useState("student");
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic values for friends and raffle participants
  const [friendsCount] = useState(842);
  const [raffleParticipants] = useState(1560);
  const maxRaffleParticipants = 3000;
  const raffleProgress = Math.round(raffleParticipants / maxRaffleParticipants * 100);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          setIsScrolled(scrollPosition > 200);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewPrizes = () => {
    console.log("Navigating to prizes page");
    navigate("/prizes");
  };

  const handleInstructorSignup = () => {
    setSignupTab("instructor");
    setIsSignupOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedWorldMap />
      <Header onSearch={handleSearch} />
      <main className="flex-1 px-2 sm:px-4 lg:px-8 max-w-screen-xl mx-auto py-4 sm:py-6 relative z-10">
        
        {/* Stats Card - Smoother floating animation */}
        <div className={`flex flex-col md:flex-row justify-between items-center mb-4 sm:mb-6 glass-card p-3 sm:p-6 rounded-2xl transition-all duration-700 ease-out transform ${
          isScrolled && window.innerWidth >= 1024
            ? 'fixed top-20 right-4 w-[300px] z-30 scale-90 shadow-2xl opacity-95' 
            : 'mx-2 sm:mx-[120px] my-0 w-auto scale-100 opacity-100'
        }`}>
          <div className="flex items-center mb-3 md:mb-0 w-full md:w-auto justify-center md:justify-start">
            <div className="bg-white/20 p-2 sm:p-3 rounded-full mr-3 backdrop-blur-sm">
              <Users size={20} className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="text-white">
              <p className="text-xs sm:text-sm opacity-90">מספר חברים</p>
              <p className="font-semibold text-base sm:text-lg">{friendsCount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex flex-col w-full md:w-2/3 my-3 sm:my-[12px] mx-0 px-0 sm:px-[20px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 sm:p-3 rounded-full mr-3 backdrop-blur-sm">
                  <Percent size={20} className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-white">
                  <p className="text-xs sm:text-sm opacity-90">משתתפים בהגרלה</p>
                  <p className="text-sm sm:text-lg font-bold">{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-white text-center">
                <p className="text-xl sm:text-2xl font-bold">{raffleProgress}%</p>
                <p className="text-xs opacity-80">הושלם</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Progress value={raffleProgress} className="h-3 sm:h-4 bg-white/20 flex-grow" />
              <Button 
                onClick={handleViewPrizes} 
                size="sm" 
                className="modern-button bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 flex items-center gap-1 sm:gap-2 py-2 h-auto text-white text-xs sm:text-sm px-3 sm:px-[20px] cursor-pointer"
                type="button"
              >
                <Trophy size={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">לצפיה בפרסים</span>
                <span className="sm:hidden">פרסים</span>
              </Button>
            </div>
            <div className="flex justify-between text-white text-xs mt-2 opacity-70">
              <span>התחלה</span>
              <span>יעד: {maxRaffleParticipants.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Smoother animation */}
        <div className={`flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-2 sm:px-0 transition-all duration-700 ease-out ${
          isScrolled && window.innerWidth >= 1024
            ? 'fixed top-[360px] right-4 z-30 flex-col w-[300px] opacity-95' 
            : 'w-auto opacity-100'
        }`}>
          <FlightCoursesDrawer />
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleInstructorSignup}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
              >
                <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">הרשמה כמדריך/מתלמד</span>
                <span className="sm:hidden">הרשמה כמדריך</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[900px] max-h-[90vh] overflow-y-auto mx-auto">
              <SignupForm onClose={() => setIsSignupOpen(false)} defaultTab={signupTab} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Bar - Smooth transitions */}
        <div className={`glass-card p-2 sm:p-4 mb-4 sm:mb-6 mx-2 sm:mx-[240px] py-2 sm:py-[4px] my-2 sm:my-[7px] transition-all duration-500 ease-out ${
          isScrolled && window.innerWidth >= 1024 ? 'transform translate-x-[-160px]' : 'transform translate-x-0'
        }`}>
          <FilterBar onFilterChange={setActiveFilter} />
        </div>
        
        <h1 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-white drop-shadow-lg px-2 transition-all duration-500 ease-out ${
          isScrolled && window.innerWidth >= 1024 ? 'transform translate-x-[-80px]' : 'transform translate-x-0'
        }`}>מוצרים מומלצים</h1>
        
        <div className={`mt-4 sm:mt-6 px-2 sm:px-0 transition-all duration-500 ease-out ${
          isScrolled && window.innerWidth >= 1024 ? 'transform translate-x-[-80px]' : 'transform translate-x-0'
        }`}>
          <ProductGrid filter={activeFilter} searchQuery={searchQuery} />
        </div>
      </main>
      
      <SiteMap />
    </div>
  );
};

export default Index;
