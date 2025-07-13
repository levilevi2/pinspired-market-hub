
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 relative">
      <AnimatedWorldMap />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
          <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
          <a href="/" className="text-primary hover:text-primary/80 underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
