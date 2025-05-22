
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import SiteMap from "@/components/SiteMap";

interface Page {
  id: string;
  title: string;
  path: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Connection {
  from: string;
  to: string;
  points?: { x1: number; y1: number; x2: number; y2: number };
}

const SiteMapVisual: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: "home", title: "דף הבית", path: "/", x: 200, y: 100, width: 120, height: 80 },
    { id: "login", title: "כניסה", path: "/login", x: 50, y: 250, width: 120, height: 80 },
    { id: "categories", title: "קטגוריות", path: "/categories", x: 200, y: 250, width: 120, height: 80 },
    { id: "discountedFlight", title: "טיסות מוזלות", path: "/discounted-flight", x: 350, y: 250, width: 120, height: 80 },
    { id: "cart", title: "סל קניות", path: "/cart", x: 500, y: 250, width: 120, height: 80 },
    { id: "prizes", title: "פרסים", path: "/prizes", x: 200, y: 400, width: 120, height: 80 },
    { id: "raffleEntry", title: "הגרלה", path: "/raffle-entry", x: 350, y: 400, width: 120, height: 80 },
    { id: "instructorDetails", title: "מדריכים", path: "/instructor-details", x: 500, y: 400, width: 120, height: 80 },
  ]);
  
  const [connections, setConnections] = useState<Connection[]>([
    { from: "home", to: "login" },
    { from: "home", to: "categories" },
    { from: "home", to: "discountedFlight" },
    { from: "home", to: "cart" },
    { from: "home", to: "prizes" },
    { from: "home", to: "raffleEntry" },
    { from: "discountedFlight", to: "instructorDetails" },
    { from: "login", to: "home" },
  ]);
  
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState<{ from: string; startX: number; startY: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Calculate connection positions
  useEffect(() => {
    const updatedConnections = connections.map(conn => {
      const fromPage = pages.find(p => p.id === conn.from);
      const toPage = pages.find(p => p.id === conn.to);
      
      if (!fromPage || !toPage) return conn;
      
      const fromX = fromPage.x + fromPage.width / 2;
      const fromY = fromPage.y + fromPage.height / 2;
      const toX = toPage.x + toPage.width / 2;
      const toY = toPage.y + toPage.height / 2;
      
      return {
        ...conn,
        points: { x1: fromX, y1: fromY, x2: toX, y2: toY }
      };
    });
    
    setConnections(updatedConnections);
  }, [pages]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    if (dragging) {
      const pageIndex = pages.findIndex(p => p.id === dragging);
      if (pageIndex !== -1) {
        const newPages = [...pages];
        newPages[pageIndex] = {
          ...newPages[pageIndex],
          x: x - dragOffset.x,
          y: y - dragOffset.y
        };
        setPages(newPages);
      }
    }
  };
  
  const startDrag = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const page = pages.find(p => p.id === id);
    if (!page) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - page.x;
      const offsetY = e.clientY - rect.top - page.y;
      setDragOffset({ x: offsetX, y: offsetY });
    }
    
    setDragging(id);
  };
  
  const endDrag = () => {
    setDragging(null);
    setDrawing(null);
  };
  
  const startDrawing = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    const page = pages.find(p => p.id === id);
    if (!page) return;
    
    const startX = page.x + page.width / 2;
    const startY = page.y + page.height / 2;
    
    setDrawing({
      from: id,
      startX,
      startY
    });
  };
  
  const endDrawing = (id: string) => {
    if (drawing && drawing.from !== id) {
      // Check if connection already exists
      const existingConnection = connections.find(
        conn => (conn.from === drawing.from && conn.to === id) || 
               (conn.from === id && conn.to === drawing.from)
      );
      
      if (!existingConnection) {
        setConnections([
          ...connections,
          { from: drawing.from, to: id }
        ]);
        
        toast({
          title: "קישור נוצר בהצלחה",
          description: `קישור בין ${drawing.from} ל-${id} נוצר`
        });
      }
    }
    
    setDrawing(null);
  };
  
  const exportAsJson = () => {
    const data = {
      pages,
      connections: connections.map(({ from, to }) => ({ from, to }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "מפת האתר יוצאה בהצלחה",
      description: "הקובץ sitemap.json נשמר למחשב שלך"
    });
  };
  
  const removeConnection = (fromId: string, toId: string) => {
    setConnections(connections.filter(
      conn => !(conn.from === fromId && conn.to === toId)
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-900/70">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" asChild className="text-white mr-2">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              חזרה
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-white">מפת האתר חזותית</h1>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-md shadow-xl border-pinterest-purple/20 p-4">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-white text-sm" dir="rtl">
              <span>גרור את המסכים למיקום הרצוי. לחץ על הכפתור + ואז על מסך אחר כדי ליצור קישורים.</span>
            </div>
            <Button onClick={exportAsJson} className="bg-pinterest-purple">
              ייצוא JSON
            </Button>
          </div>
          
          <div 
            ref={containerRef}
            className="relative bg-blue-900/30 border border-white/20 rounded-md overflow-hidden"
            style={{ height: "600px" }}
            onMouseMove={handleMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
          >
            {/* SVG layer for connections */}
            <svg 
              ref={svgRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
              style={{ overflow: "visible" }}
            >
              {connections.map((conn, i) => {
                if (!conn.points) return null;
                const { x1, y1, x2, y2 } = conn.points;
                
                // Calculate control points for curved line
                const dx = Math.abs(x2 - x1) * 0.5;
                const cpx1 = x1 + dx;
                const cpx2 = x2 - dx;
                
                return (
                  <g key={`conn-${i}`}>
                    <path 
                      d={`M ${x1} ${y1} C ${cpx1} ${y1}, ${cpx2} ${y2}, ${x2} ${y2}`}
                      stroke="rgba(255, 255, 255, 0.6)"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                );
              })}
              
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="rgba(255, 255, 255, 0.6)"
                  />
                </marker>
              </defs>
              
              {/* Line being drawn */}
              {drawing && (
                <line
                  x1={drawing.startX}
                  y1={drawing.startY}
                  x2={mousePos.x}
                  y2={mousePos.y}
                  stroke="rgba(255, 150, 255, 0.8)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )}
            </svg>
            
            {/* Page boxes */}
            {pages.map((page) => (
              <div
                key={page.id}
                className={`absolute cursor-move flex flex-col items-center justify-center rounded-md shadow-lg 
                           ${dragging === page.id ? 'border-pinterest-purple border-2' : 'border border-white/40'} 
                           bg-blue-800/80 text-white`}
                style={{
                  left: `${page.x}px`,
                  top: `${page.y}px`,
                  width: `${page.width}px`,
                  height: `${page.height}px`,
                  zIndex: dragging === page.id ? 10 : 1
                }}
                onMouseDown={(e) => startDrag(page.id, e)}
              >
                <div className="text-center font-bold">{page.title}</div>
                <div className="text-xs opacity-70">{page.path}</div>
                
                {/* Connection button */}
                <button
                  className="absolute -bottom-3 right-1/2 translate-x-1/2 w-6 h-6 bg-pinterest-purple rounded-full text-white z-20 flex items-center justify-center text-xs shadow-md border border-white/20"
                  onClick={(e) => drawing ? endDrawing(page.id) : startDrawing(page.id, e)}
                >
                  {drawing ? (drawing.from === page.id ? "×" : "✓") : "+"}
                </button>
              </div>
            ))}
            
            {/* Connection list */}
            <div className="absolute bottom-2 left-2 bg-blue-900/90 p-2 rounded-md shadow-lg border border-white/20 w-64">
              <h3 className="text-white text-sm font-bold mb-2" dir="rtl">קישורים קיימים:</h3>
              <div className="max-h-32 overflow-y-auto" dir="rtl">
                {connections.map((conn, i) => (
                  <div key={`conn-list-${i}`} className="flex justify-between text-xs text-white mb-1">
                    <span>{pages.find(p => p.id === conn.from)?.title} → {pages.find(p => p.id === conn.to)?.title}</span>
                    <button 
                      className="text-red-400 hover:text-red-300"
                      onClick={() => removeConnection(conn.from, conn.to)}
                    >
                      מחק
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </main>
      <SiteMap />
    </div>
  );
};

export default SiteMapVisual;
