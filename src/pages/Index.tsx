import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import SiteMap from "@/components/SiteMap";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
import FlightCoursesDrawer from "@/components/FlightCoursesDrawer";
import SignupForm from "@/components/SignupForm";
import { Users, Percent, Trophy, UserPlus, Plane } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const Index = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupTab, setSignupTab] = useState("student");

  // Dynamic values for friends and raffle participants
  const [friendsCount] = useState(842);
  const [raffleParticipants] = useState(1560);
  const maxRaffleParticipants = 3000;
  const raffleProgress = Math.round(raffleParticipants / maxRaffleParticipants * 100);
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
  return <div className="relative">
      <AnimatedWorldMap />
      
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header onSearch={handleSearch} />
      </div>
      
      {/* Scroll Container */}
      <div className="scroll-container bg-gradient-to-br from-background via-accent/10 to-secondary/20 relative">
        
        {/* Section 1: Hero + Stats */}
        <section id="section-0" className="scroll-section px-2 sm:px-4 lg:px-6">
          <div className="max-w-6xl mx-auto space-y-1">
            {/* Hero */}
            <div className="text-center animate-fade-in-scale pt-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-2">
                <Plane className="w-7 h-7 text-primary" />
              </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light mb-1 sm:mb-2 text-foreground tracking-tight">
              FLY ACADEMY
            </h1>
            <p className="text-base sm:text-lg mb-3 sm:mb-4 max-w-xl mx-auto leading-relaxed text-foreground font-bold sm:text-3xl px-4">קהילת שוחרי הטיס בישראל מזמינה אותך להיות חלק מאיתנו להנות ולזכות בהגרלות ומתנות שוות ובהנחות ללא מתחרים</p>
              
            <div className="flex flex-row gap-2 justify-center items-center px-4 sm:px-0">
              <FlightCoursesDrawer />
              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleInstructorSignup} variant="outline" size="default" className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/5 text-sm sm:text-base h-auto py-3 sm:py-2">
                    <UserPlus className="h-4 w-4 ml-2 sm:h-5 sm:w-5" />
                    הרשמה כמדריך
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-[900px] max-h-[90vh] overflow-y-auto mx-auto">
                  <SignupForm onClose={() => setIsSignupOpen(false)} defaultTab={signupTab} />
                </DialogContent>
              </Dialog>
            </div>
            </div>

            {/* Stats */}
            <div className="max-w-4xl mx-auto animate-slide-in-left pb-1 px-2 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                
                {/* Friends Counter Card */}
                <div className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-xl p-3 sm:p-4 hover:bg-card transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">חברים באתר</p>
                      <p className="text-2xl sm:text-3xl font-light text-foreground">{friendsCount.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
                
                {/* Raffle Progress Card */}
                <div className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-xl p-3 sm:p-4 hover:bg-card transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">משתתפים בהגרלה</p>
                      <p className="text-sm sm:text-base font-light text-foreground">{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg sm:text-xl font-light text-primary">{raffleProgress}%</p>
                      <p className="text-xs text-muted-foreground">הושלם</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={raffleProgress} className="h-2" />
                    <Button onClick={handleViewPrizes} variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/10 text-xs sm:text-sm">
                      <Trophy className="w-3 h-3 ml-2 sm:w-4 sm:h-4" />
                      צפה בפרסים
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Products + Site Map */}
        <section id="section-1" className="scroll-section px-3 sm:px-5 lg:px-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto py-2 space-y-3">
            {/* Products */}
            <div className="animate-slide-in-right">
              {/* Filter Section */}
              <div className="bg-deep-cyan/90 backdrop-blur-sm border border-deep-cyan/60 rounded-xl p-2 mb-3 max-w-4xl mx-auto">
                <FilterBar onFilterChange={setActiveFilter} />
              </div>
              
              {/* Products Header */}
              <div className="text-center mb-3 px-4">
                <h2 className="text-xl sm:text-2xl lg:text-4xl text-foreground tracking-wide font-medium">
                  להשתתפות בהגרלה ורכישה של מוצרים לטיס
                </h2>
                <div className="w-12 sm:w-20 h-0.5 bg-primary/40 mx-auto mt-2"></div>
              </div>
              
              {/* Products Grid */}
              <ProductGrid filter={activeFilter} searchQuery={searchQuery} />
            </div>

            {/* Site Map */}
            <div className="animate-slide-in-bottom">
              <SiteMap />
            </div>
          </div>
        </section>
        
      </div>
    </div>;
};
export default Index;