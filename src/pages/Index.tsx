import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import SiteMap from "@/components/SiteMap";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
import FlightCoursesDrawer from "@/components/FlightCoursesDrawer";
import SignupForm from "@/components/SignupForm";
import SectionNavigation from "@/components/SectionNavigation";
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
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic values for friends and raffle participants
  const [friendsCount] = useState(842);
  const [raffleParticipants] = useState(1560);
  const maxRaffleParticipants = 3000;
  const raffleProgress = Math.round(raffleParticipants / maxRaffleParticipants * 100);

  const sections = ["hero", "stats", "products", "sitemap"];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const sectionHeight = containerRef.current.clientHeight;
      const currentSectionIndex = Math.round(scrollTop / sectionHeight);
      
      if (currentSectionIndex !== currentSection) {
        setCurrentSection(currentSectionIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentSection]);

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
    <div className="relative">
      <AnimatedWorldMap />
      
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header onSearch={handleSearch} />
      </div>
      
      {/* Section Navigation */}
      <SectionNavigation 
        sections={sections}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
      
      {/* Scroll Container */}
      <div 
        ref={containerRef}
        className="scroll-container bg-gradient-to-br from-background via-accent/10 to-secondary/20 bg-slate-700"
      >
        
        {/* Section 1: Hero */}
        <section id="section-0" className="scroll-section px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center animate-fade-in-scale">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
              <Plane className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light mb-6 text-foreground tracking-tight">
              FLY ACADEMY
            </h1>
            <p className="text-lg mb-12 max-w-xl mx-auto leading-relaxed text-zinc-950 font-bold sm:text-4xl">
              קהילת שוחרי הטיס בישראל מזמינה אותך להיות חלק מאיתנו להנות ולזכות במתנות שוות והנחות ללא מתחרים
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <FlightCoursesDrawer />
              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleInstructorSignup} variant="outline" size="lg" className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/5">
                    <UserPlus className="h-5 w-5 ml-2" />
                    הרשמה כמדריך
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-[900px] max-h-[90vh] overflow-y-auto mx-auto">
                  <SignupForm onClose={() => setIsSignupOpen(false)} defaultTab={signupTab} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Section 2: Stats */}
        <section id="section-1" className="scroll-section px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto animate-slide-in-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Friends Counter Card */}
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">חברים באתר</p>
                    <p className="text-3xl font-light text-foreground">{friendsCount.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
              
              {/* Raffle Progress Card */}
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">משתתפים בהגרלה</p>
                    <p className="text-lg font-light text-foreground">{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-light text-primary">{raffleProgress}%</p>
                    <p className="text-xs text-muted-foreground">הושלם</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Progress value={raffleProgress} className="h-2" />
                  <Button onClick={handleViewPrizes} variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/5">
                    <Trophy className="w-4 h-4 ml-2" />
                    צפה בפרסים
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Products */}
        <section id="section-2" className="scroll-section px-4 sm:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8 animate-slide-in-right">
            
            {/* Filter Section */}
            <div className="bg-card/40 backdrop-blur-sm border border-border/30 rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
              <FilterBar onFilterChange={setActiveFilter} />
            </div>
            
            {/* Products Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl text-foreground tracking-wide sm:text-5xl font-medium">
                להשתתפות בהגרלה ורכישה של מוצרים לטיס
              </h2>
              <div className="w-24 h-0.5 bg-primary/30 mx-auto mt-4"></div>
            </div>
            
            {/* Products Grid */}
            <ProductGrid filter={activeFilter} searchQuery={searchQuery} />
          </div>
        </section>

        {/* Section 4: Site Map */}
        <section id="section-3" className="scroll-section animate-slide-in-bottom">
          <SiteMap />
        </section>
        
      </div>
    </div>
  );
};
export default Index;