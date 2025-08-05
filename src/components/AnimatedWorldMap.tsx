
import { useEffect, useRef } from 'react';

interface FlightRoute {
  from: { x: number; y: number; name: string };
  to: { x: number; y: number; name: string };
  progress: number;
  speed: number;
}

const AnimatedWorldMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const routesRef = useRef<FlightRoute[]>([]);

  // Major cities coordinates (approximate positions on a 1000x500 world map)
  const cities = [
    { x: 150, y: 180, name: 'New York' },
    { x: 420, y: 120, name: 'London' },
    { x: 500, y: 140, name: 'Paris' },
    { x: 580, y: 200, name: 'Dubai' },
    { x: 750, y: 160, name: 'Tokyo' },
    { x: 850, y: 300, name: 'Sydney' },
    { x: 200, y: 280, name: 'São Paulo' },
    { x: 50, y: 200, name: 'Los Angeles' },
    { x: 520, y: 180, name: 'Moscow' },
    { x: 680, y: 220, name: 'Singapore' },
    { x: 480, y: 250, name: 'Cairo' },
    { x: 350, y: 300, name: 'Lagos' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize flight routes
    const initializeRoutes = () => {
      routesRef.current = [];
      for (let i = 0; i < 8; i++) {
        const fromCity = cities[Math.floor(Math.random() * cities.length)];
        let toCity = cities[Math.floor(Math.random() * cities.length)];
        while (toCity === fromCity) {
          toCity = cities[Math.floor(Math.random() * cities.length)];
        }

        routesRef.current.push({
          from: fromCity,
          to: toCity,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.005
        });
      }
    };

    // Draw world map outline (simplified continents) - more visible
    const drawWorldMap = () => {
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.3)';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';

      // North America
      ctx.beginPath();
      ctx.moveTo(50, 120);
      ctx.quadraticCurveTo(100, 80, 180, 100);
      ctx.quadraticCurveTo(220, 120, 200, 180);
      ctx.quadraticCurveTo(150, 220, 80, 200);
      ctx.quadraticCurveTo(30, 160, 50, 120);
      ctx.fill();
      ctx.stroke();

      // South America
      ctx.beginPath();
      ctx.moveTo(180, 240);
      ctx.quadraticCurveTo(220, 250, 230, 300);
      ctx.quadraticCurveTo(225, 380, 200, 400);
      ctx.quadraticCurveTo(170, 390, 160, 350);
      ctx.quadraticCurveTo(150, 280, 180, 240);
      ctx.fill();
      ctx.stroke();

      // Europe
      ctx.beginPath();
      ctx.moveTo(400, 100);
      ctx.quadraticCurveTo(450, 90, 480, 110);
      ctx.quadraticCurveTo(490, 140, 470, 160);
      ctx.quadraticCurveTo(430, 170, 400, 150);
      ctx.quadraticCurveTo(390, 125, 400, 100);
      ctx.fill();
      ctx.stroke();

      // Africa
      ctx.beginPath();
      ctx.moveTo(450, 180);
      ctx.quadraticCurveTo(480, 170, 520, 200);
      ctx.quadraticCurveTo(530, 280, 520, 350);
      ctx.quadraticCurveTo(480, 380, 450, 360);
      ctx.quadraticCurveTo(420, 320, 430, 250);
      ctx.quadraticCurveTo(440, 200, 450, 180);
      ctx.fill();
      ctx.stroke();

      // Asia
      ctx.beginPath();
      ctx.moveTo(520, 120);
      ctx.quadraticCurveTo(600, 100, 720, 130);
      ctx.quadraticCurveTo(780, 150, 800, 200);
      ctx.quadraticCurveTo(750, 250, 680, 240);
      ctx.quadraticCurveTo(600, 220, 550, 180);
      ctx.quadraticCurveTo(510, 150, 520, 120);
      ctx.fill();
      ctx.stroke();

      // Australia
      ctx.beginPath();
      ctx.moveTo(780, 320);
      ctx.quadraticCurveTo(830, 310, 880, 330);
      ctx.quadraticCurveTo(890, 350, 870, 370);
      ctx.quadraticCurveTo(820, 380, 780, 360);
      ctx.quadraticCurveTo(770, 340, 780, 320);
      ctx.fill();
      ctx.stroke();
    };

    // Draw cities as location markers - more visible
    const drawCities = () => {
      cities.forEach(city => {
        // Location pin - more visible
        ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(city.x, city.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Pin center
        ctx.beginPath();
        ctx.arc(city.x, city.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      });
    };

    // Draw flight routes with animated planes - more visible
    const drawFlightRoutes = () => {
      routesRef.current.forEach(route => {
        const { from, to, progress } = route;
        
        // Calculate current position
        const currentX = from.x + (to.x - from.x) * progress;
        const currentY = from.y + (to.y - from.y) * progress;
        
        // Draw route line with proper gradient bounds - more visible
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        
        // Ensure all gradient stops are between 0 and 1
        const startStop = Math.max(0, progress - 0.2);
        const progressStop = Math.max(0, Math.min(1, progress));
        const endStop = Math.min(1, progress + 0.2);
        
        gradient.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
        gradient.addColorStop(startStop, 'rgba(14, 165, 233, 0.3)');
        gradient.addColorStop(progressStop, 'rgba(14, 165, 233, 0.8)');
        gradient.addColorStop(endStop, 'rgba(14, 165, 233, 0.4)');
        gradient.addColorStop(1, 'rgba(14, 165, 233, 0.15)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw animated plane - more visible
        ctx.save();
        ctx.translate(currentX, currentY);
        
        // Calculate rotation angle
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        ctx.rotate(angle);
        
        // Draw plane - more visible
        ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
        ctx.strokeStyle = 'rgba(14, 165, 233, 1)';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-10, -4);
        ctx.lineTo(-10, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Plane wings - more visible
        ctx.beginPath();
        ctx.moveTo(-3, -8);
        ctx.lineTo(-3, 8);
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
        
        // Update progress
        route.progress += route.speed;
        if (route.progress >= 1) {
          // Reset route with new random cities
          const fromCity = cities[Math.floor(Math.random() * cities.length)];
          let toCity = cities[Math.floor(Math.random() * cities.length)];
          while (toCity === fromCity) {
            toCity = cities[Math.floor(Math.random() * cities.length)];
          }
          route.from = fromCity;
          route.to = toCity;
          route.progress = 0;
        }
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawWorldMap();
      drawCities();
      drawFlightRoutes();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    canvas.width = 1000;
    canvas.height = 500;
    initializeRoutes();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden opacity-30">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          filter: 'blur(0.3px) brightness(0.4)',
          transform: 'scale(1.05)',
        }}
      />
    </div>
  );
};

export default AnimatedWorldMap;
