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
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
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
  return <div className="min-h-screen flex flex-col relative bg-black">
      <Header onSearch={handleSearch} />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 text-white tracking-tight">
            FLY <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">ACADEMY</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            האקדמיה המובילה לטיסה מקצועית
          </p>
        </div>

        {/* Stats Card - Modern Nike style */}
        <div className={`glass-card p-6 sm:p-8 mb-12 mx-auto max-w-4xl transition-all duration-700 ease-out ${isScrolled && window.innerWidth >= 1024 ? 'fixed top-20 right-4 w-[320px] z-30 scale-90 shadow-2xl' : 'w-full scale-100'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Friends Counter */}
            <div className="flex items-center justify-center md:justify-start">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl mr-4">
                <Users size={24} className="text-white" />
              </div>
              <div className="text-white">
                <p className="text-sm font-medium opacity-80 uppercase tracking-wider">MEMBERS</p>
                <p className="text-3xl font-black">{friendsCount.toLocaleString()}</p>
              </div>
            </div>
            
            {/* Raffle Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl mr-3">
                    <Percent size={20} className="text-white" />
                  </div>
                  <div className="text-white">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-wider">RAFFLE</p>
                    <p className="text-lg font-bold">{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-white text-center">
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                    {raffleProgress}%
                  </p>
                  <p className="text-xs opacity-60 uppercase tracking-wider">COMPLETE</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-grow bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500" style={{
                  width: `${raffleProgress}%`
                }} />
                </div>
                <Button onClick={handleViewPrizes} className="nike-accent-button px-6 py-2 text-sm font-bold">
                  <Trophy size={16} className="mr-2" />
                  PRIZES
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Modern CTA style */}
        <div className={`flex flex-col sm:flex-row justify-center gap-4 mb-16 transition-all duration-700 ease-out ${isScrolled && window.innerWidth >= 1024 ? 'fixed top-[400px] right-4 z-30 flex-col w-[320px]' : 'w-full'}`}>
          <FlightCoursesDrawer />
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleInstructorSignup} className="nike-accent-button px-8 py-4 text-base font-bold tracking-wide">
                <UserPlus className="mr-2 h-5 w-5" />
                JOIN AS INSTRUCTOR
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[900px] max-h-[90vh] overflow-y-auto mx-auto">
              <SignupForm onClose={() => setIsSignupOpen(false)} defaultTab={signupTab} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Section */}
        <div className="glass-card p-4 mb-12 max-w-4xl px-[89px] mx-[164px]">
          <FilterBar onFilterChange={setActiveFilter} />
        </div>
        
        {/* Products Section */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-black text-center text-white tracking-tight">
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">PRODUCTS</span>
          </h2>
          
          <ProductGrid filter={activeFilter} searchQuery={searchQuery} />
        </div>
      </main>
      
      <SiteMap />
    </div>;
};
export default Index;