
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-primary">
            FLY ACADEMY
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            האקדמיה המובילה לטיסה מקצועית
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-card border rounded-lg p-6 sm:p-8 mb-12 mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Friends Counter */}
            <div className="flex items-center justify-center md:justify-start">
              <div className="bg-primary p-4 rounded-full mr-4">
                <Users size={24} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">חברים באתר</p>
                <p className="text-3xl font-bold text-primary">{friendsCount.toLocaleString()}</p>
              </div>
            </div>
            
            {/* Raffle Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-secondary p-3 rounded-full mr-3">
                    <Percent size={20} className="text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">משתתפים בהגרלה</p>
                    <p className="text-lg font-semibold">{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{raffleProgress}%</p>
                  <p className="text-xs text-muted-foreground">הושלם</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Progress value={raffleProgress} className="flex-grow" />
                <Button onClick={handleViewPrizes} className="flex items-center gap-2">
                  <Trophy size={16} />
                  פרסים
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <FlightCoursesDrawer />
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleInstructorSignup} size="lg" className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                הרשמה כמדריך
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[900px] max-h-[90vh] overflow-y-auto mx-auto">
              <SignupForm onClose={() => setIsSignupOpen(false)} defaultTab={signupTab} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Section */}
        <div className="bg-card border rounded-lg p-4 mb-12 max-w-4xl mx-auto">
          <FilterBar onFilterChange={setActiveFilter} />
        </div>
        
        {/* Products Section */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            מוצרים מומלצים
          </h2>
          
          <ProductGrid filter={activeFilter} searchQuery={searchQuery} />
        </div>
      </main>
      
      <SiteMap />
    </div>
  );
};

export default Index;
