
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

interface Page {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

const SiteMapVisual: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: 'home', name: 'דף הבית', x: 100, y: 100, width: 120, height: 80 },
    { id: 'login', name: 'התחברות', x: 300, y: 100, width: 120, height: 80 },
    { id: 'categories', name: 'קטגוריות', x: 500, y: 100, width: 120, height: 80 },
    { id: 'discounted-flight', name: 'טיסות מוזלות', x: 100, y: 250, width: 120, height: 80 },
    { id: 'instructor-details', name: 'פרטי מדריכים', x: 300, y: 250, width: 120, height: 80 },
    { id: 'cart', name: 'סל קניות', x: 500, y: 250, width: 120, height: 80 },
    { id: 'prizes', name: 'פרסים', x: 100, y: 400, width: 120, height: 80 },
    { id: 'raffle-entry', name: 'הגרלה', x: 300, y: 400, width: 120, height: 80 }
  ]);
  
  const [connections, setConnections] = useState<Connection[]>([
    { id: '1', from: 'home', to: 'login' },
    { id: '2', from: 'home', to: 'categories' },
    { id: '3', from: 'home', to: 'discounted-flight' },
    { id: '4', from: 'discounted-flight', to: 'instructor-details' },
    { id: '5', from: 'discounted-flight', to: 'cart' },
    { id: '6', from: 'home', to: 'prizes' },
    { id: '7', from: 'home', to: 'raffle-entry' }
  ]);

  const [draggedPage, setDraggedPage] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = useCallback((pageId: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isConnecting) {
      if (!connectionStart) {
        setConnectionStart(pageId);
      } else if (connectionStart !== pageId) {
        const newConnection: Connection = {
          id: Date.now().toString(),
          from: connectionStart,
          to: pageId
        };
        setConnections(prev => [...prev, newConnection]);
        setConnectionStart(null);
        setIsConnecting(false);
      }
    } else {
      setDraggedPage(pageId);
    }
  }, [isConnecting, connectionStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (draggedPage) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPages(prev => prev.map(page => 
        page.id === draggedPage 
          ? { ...page, x: x - page.width/2, y: y - page.height/2 }
          : page
      ));
    }
  }, [draggedPage]);

  const handleMouseUp = useCallback(() => {
    setDraggedPage(null);
  }, []);

  const addNewPage = () => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      name: 'דף חדש',
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      width: 120,
      height: 80
    };
    setPages(prev => [...prev, newPage]);
  };

  const removePage = (pageId: string) => {
    setPages(prev => prev.filter(page => page.id !== pageId));
    setConnections(prev => prev.filter(conn => conn.from !== pageId && conn.to !== pageId));
  };

  const removeConnection = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  const exportMap = () => {
    const mapData = { pages, connections };
    const blob = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-map.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPageCenter = (page: Page) => ({
    x: page.x + page.width / 2,
    y: page.y + page.height / 2
  });

  return (
    <div className="min-h-screen flex flex-col bg-blue-900/70">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="text-white mr-2">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                חזרה
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-white">מפת האתר החזותית</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setIsConnecting(!isConnecting)}
              variant={isConnecting ? "destructive" : "secondary"}
              className="text-white"
            >
              {isConnecting ? "בטל חיבור" : "צור חיבור"}
            </Button>
            <Button onClick={addNewPage} variant="secondary" className="text-white">
              <Plus className="mr-2 h-4 w-4" />
              הוסף דף
            </Button>
            <Button onClick={exportMap} variant="secondary" className="text-white">
              <Download className="mr-2 h-4 w-4" />
              ייצא מפה
            </Button>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-pinterest-purple/20">
          <CardHeader>
            <CardTitle className="text-white text-right">
              מפת האתר - גרור דפים וצור קשרים ביניהם
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="relative w-full h-96 bg-white/5 rounded-lg border-2 border-dashed border-white/20 overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                ref={svgRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                {connections.map(connection => {
                  const fromPage = pages.find(p => p.id === connection.from);
                  const toPage = pages.find(p => p.id === connection.to);
                  
                  if (!fromPage || !toPage) return null;
                  
                  const fromCenter = getPageCenter(fromPage);
                  const toCenter = getPageCenter(toPage);
                  
                  return (
                    <g key={connection.id}>
                      <line
                        x1={fromCenter.x}
                        y1={fromCenter.y}
                        x2={toCenter.x}
                        y2={toCenter.y}
                        stroke="#e11d48"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                      <circle
                        cx={(fromCenter.x + toCenter.x) / 2}
                        cy={(fromCenter.y + toCenter.y) / 2}
                        r="8"
                        fill="#dc2626"
                        className="cursor-pointer pointer-events-auto"
                        onClick={() => removeConnection(connection.id)}
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
                      fill="#e11d48"
                    />
                  </marker>
                </defs>
              </svg>
              
              {pages.map(page => (
                <div
                  key={page.id}
                  className={`absolute bg-blue-600 text-white rounded-lg p-2 text-xs cursor-pointer select-none border-2 hover:bg-blue-700 transition-colors ${
                    connectionStart === page.id ? 'border-yellow-400' : 'border-blue-500'
                  }`}
                  style={{
                    left: page.x,
                    top: page.y,
                    width: page.width,
                    height: page.height,
                    zIndex: 2
                  }}
                  onMouseDown={(e) => handleMouseDown(page.id, e)}
                >
                  <div className="flex justify-between items-start h-full">
                    <span className="flex-1 text-center">{page.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 text-red-300 hover:text-red-100"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        removePage(page.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-white/70 text-sm text-right">
              <p>הוראות שימוש:</p>
              <ul className="list-disc list-inside mr-4 space-y-1">
                <li>גרור דפים כדי לשנות את מיקומם</li>
                <li>לחץ על "צור חיבור" ואז לחץ על שני דפים כדי לחבר ביניהם</li>
                <li>לחץ על העיגול האדום באמצע הקו כדי למחוק חיבור</li>
                <li>לחץ על X בפינת הדף כדי למחוק דף</li>
                <li>השתמש ב"ייצא מפה" כדי לשמור את המפה כקובץ JSON</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SiteMapVisual;
