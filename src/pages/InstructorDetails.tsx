import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import InstructorCard, { Instructor } from "@/components/InstructorCard";
import FlightCoursesDrawer from "@/components/FlightCoursesDrawer";

const InstructorDetails: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([300, 600]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('instructorFavorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = (instructorId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(instructorId)) {
      newFavorites.delete(instructorId);
    } else {
      newFavorites.add(instructorId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('instructorFavorites', JSON.stringify(Array.from(newFavorites)));
  };
  const instructors: Instructor[] = [{
    id: "inst1",
    name: "יוסי כהן",
    experience: 15,
    hourlyRate: 450,
    rating: 4.8,
    totalFlights: 1200,
    specialties: ["PPL - קורס טיס פרטי", "טיסות לילה", "הדרכת מתחילים"],
    aircraftTypes: ["Cessna 172", "Piper Cherokee", "Diamond DA40"],
    location: "שדה התעופה הרצליה",
    description: "מדריך טיסה מנוסה עם התמחות בהדרכת תלמידים מתחילים לקורס PPL. בעל ניסיון רב בטיסות לילה וניווט מתקדם.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "3,000 רגל",
      flightZone: "צפון תל אביב",
      aircraftModel: "Cessna 172SP",
      safetyLevel: "גבוהה מאוד"
    }
  }, {
    id: "inst2",
    name: "רחל לוי",
    experience: 12,
    hourlyRate: 420,
    rating: 4.9,
    totalFlights: 950,
    specialties: ["CPL - קורס טיס מסחרי", "טיסות פנורמיות", "צילום אווירי"],
    aircraftTypes: ["Piper Cherokee", "Cessna 182", "Beechcraft Bonanza"],
    location: "שדה התעופה בן גוריון",
    description: "מדריכה מקצועית עם התמחות בקורס CPL וטיסות מסחריות. מתמחה בהדרכה עדינה ומותאמת אישית.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "2,500 רגל",
      flightZone: "חוף הים התיכון",
      aircraftModel: "Piper PA-28",
      safetyLevel: "גבוהה"
    }
  }, {
    id: "inst3",
    name: "דוד מזרחי",
    experience: 20,
    hourlyRate: 500,
    rating: 4.7,
    totalFlights: 1800,
    specialties: ["ATPL - קורס טייס קווים", "אווירובטיקה", "הכנה לבחינות"],
    aircraftTypes: ["Extra 300", "Pitts Special", "Boeing 737 Sim"],
    location: "שדה התעופה קרית שמונה",
    description: "מדריך בכיר עם ניסיון נרחב בקורס ATPL וטיסות מתקדמות. מתמחה בהכנת תלמידים לבחינות רשיון טיס של חברות תעופה.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "5,000 רגל",
      flightZone: "צפון ישראל",
      aircraftModel: "Extra 300L",
      safetyLevel: "גבוהה"
    }
  }, {
    id: "inst4",
    name: "מירי בן דוד",
    experience: 8,
    hourlyRate: 380,
    rating: 4.6,
    totalFlights: 600,
    specialties: ["שיעור טיסה היכרות", "טיסות תיירות", "הדרכת נשים"],
    aircraftTypes: ["Cessna 150", "Piper Cherokee", "Diamond DA20"],
    location: "שדה התעופה חיפה",
    description: "מדריכה צעירה ומקצועית עם גישה חדשנית להדרכה. מתמחה בשיעורי היכרות וטיסות תיירות בסביבה נוחה.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "2,000 רגל",
      flightZone: "מפרץ חיפה",
      aircraftModel: "Cessna 150M",
      safetyLevel: "גבוהה"
    }
  }, {
    id: "inst5",
    name: "אבי שמעון",
    experience: 18,
    hourlyRate: 470,
    rating: 4.9,
    totalFlights: 1500,
    specialties: ["FI - קורס מדריך טיסה", "הכשרת מדריכים", "בדיקות טיסה"],
    aircraftTypes: ["Cessna 172", "Piper Cherokee", "Diamond DA40"],
    location: "שדה התעופה הרצליה",
    description: "מדריך מדריכים מנוסה עם התמחות בהכשרת דור הבא של מדריכי הטיסה. בעל ניסיון רב בבדיקות טיסה ואישורים.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "4,000 רגל",
      flightZone: "מרכז הארץ",
      aircraftModel: "Cessna 172R",
      safetyLevel: "גבוהה מאוד"
    }
  }, {
    id: "inst6",
    name: "תמר גולן",
    experience: 14,
    hourlyRate: 520,
    rating: 4.8,
    totalFlights: 1100,
    specialties: ["IR - טיסת מכשירים", "טיסות לילה", "טיסה עיוורת"],
    aircraftTypes: ["Cessna 172", "Piper Cherokee", "Beechcraft Baron"],
    location: "שדה התעופה בן גוריון",
    description: "מומחית בטיסת מכשירים וטיסות בתנאי ראות מוגבלת. מתמחה בהדרכה לטיסות לילה ותנאי מזג אוויר קשים.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "6,000 רגל",
      flightZone: "מרכז הארץ",
      aircraftModel: "Cessna 172SP",
      safetyLevel: "גבוהה מאוד"
    }
  }, {
    id: "inst7",
    name: "רון אברהם",
    experience: 16,
    hourlyRate: 490,
    rating: 4.7,
    totalFlights: 1350,
    specialties: ["ME - טיסה דו-מנועית", "מטוסים מתקדמים", "הדרכה טכנית"],
    aircraftTypes: ["Beechcraft Baron", "Piper Seneca", "Diamond DA42"],
    location: "שדה התעופה הרצליה",
    description: "מדריך מנוסה במטוסים דו-מנועיים ומערכות מתקדמות. מתמחה בהעברת ידע טכני והדרכה על מטוסים מורכבים.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "8,000 רגל",
      flightZone: "צפון תל אביב",
      aircraftModel: "Beechcraft Baron 58",
      safetyLevel: "גבוהה"
    }
  }, {
    id: "inst8",
    name: "שרה כץ",
    experience: 10,
    hourlyRate: 390,
    rating: 4.8,
    totalFlights: 750,
    specialties: ["תיאוריה", "הכנה למבחנים", "לימוד תיאורטי"],
    aircraftTypes: ["Cessna 172", "Simulator"],
    location: "מרכז ההדרכה תל אביב",
    description: "מומחית בהוראת תיאוריית הטיסה והכנה למבחני רישוי. מתמחה בהסברים ברורים ושיטות לימוד יעילות.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "כיתה/סימולטור",
      flightZone: "מרכז הדרכה",
      aircraftModel: "סימולטור מתקדם",
      safetyLevel: "גבוהה מאוד"
    }
  }, {
    id: "inst9",
    name: "יגאל דנינו",
    experience: 22,
    hourlyRate: 550,
    rating: 4.9,
    totalFlights: 2000,
    specialties: ["סימולטור טיסה", "הדרכה מתקדמת", "מצבי חירום"],
    aircraftTypes: ["Boeing 737 Sim", "Airbus A320 Sim", "Cessna Citation"],
    location: "מרכז סימולציה בן גוריון",
    description: "מדריך בכיר עם התמחות בסימולטורי טיסה מתקדמים. מתמחה בהדרכה למצבי חירום וטיסות מורכבות.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "35,000 רגל",
      flightZone: "סימולטור מלא",
      aircraftModel: "Boeing 737-800",
      safetyLevel: "גבוהה מאוד"
    }
  }, {
    id: "inst10",
    name: "נועה אלון",
    experience: 7,
    hourlyRate: 350,
    rating: 4.7,
    totalFlights: 450,
    specialties: ["קורס ריענון", "חזרה לטיסה", "שיעורים זוגיים"],
    aircraftTypes: ["Cessna 150", "Piper Cherokee"],
    location: "שדה התעופה חיפה",
    description: "מדריכה המתמחה בקורסי ריענון לטייסים חוזרים ושיעורי טיסה זוגיים. גישה סבלנית ומותאמת אישית.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "2,500 רגל",
      flightZone: "צפון הארץ",
      aircraftModel: "Cessna 150",
      safetyLevel: "גבוהה"
    }
  }, {
    id: "inst11",
    name: "עמוס גרין",
    experience: 25,
    hourlyRate: 400,
    rating: 4.6,
    totalFlights: 2200,
    specialties: ["מלגות וסיוע", "הדרכה כלכלית", "תוכניות מיוחדות"],
    aircraftTypes: ["Cessna 172", "Piper Cherokee"],
    location: "משרד ניהול מלגות",
    description: "רכז מלגות ותוכניות סיוע כלכלי לקורסי טיסה. מתמחה בייעוץ כלכלי ובניית תוכניות תשלום מותאמות.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "ייעוץ משרדי",
      flightZone: "כל הארץ",
      aircraftModel: "תוכניות מותאמות",
      safetyLevel: "גבוהה"
    }
  }, {
    id: "inst12",
    name: "אילן ברק",
    experience: 13,
    hourlyRate: 320,
    rating: 4.8,
    totalFlights: 850,
    specialties: ["מסלול מלא PPL-ATPL", "ליווי אישי", "תכנון קריירה"],
    aircraftTypes: ["Cessna 172", "Piper Cherokee", "Simulator"],
    location: "מרכז ההדרכה הרצליה",
    description: "מדריך המתמחה בליווי תלמידים לאורך המסלול המלא מרישיון פרטי ועד טייס קווים. מתמחה בתכנון קריירה בתעופה.",
    image: "/api/placeholder/64/64",
    flightSettings: {
      maxAltitude: "משתנה לפי שלב",
      flightZone: "כל הארץ",
      aircraftModel: "מגוון מטוסים",
      safetyLevel: "גבוהה מאוד"
    }
  }];
  const filterInstructorsByCourse = (course: string) => {
    if (course === 'all') return instructors;
    const filterMap: {
      [key: string]: string;
    } = {
      'PPL': 'PPL',
      'CPL': 'CPL',
      'ATPL': 'ATPL',
      'FI': 'FI',
      'IR': 'IR',
      'ME': 'ME',
      'היכרות': 'היכרות',
      'מסלול מלא': 'מסלול מלא',
      'חבילה מוזלת': 'חבילה',
      'תיאום': 'תיאום',
      'תיאוריה': 'תיאוריה',
      'סימולטור': 'סימולטור',
      'ריענון': 'ריענון',
      'זוגי': 'זוגי',
      'מלגות': 'מלגות'
    };
    const searchTerm = filterMap[course] || course;
    return instructors.filter(instructor => instructor.specialties.some(specialty => specialty.includes(searchTerm) || specialty.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const filteredInstructors = filterInstructorsByCourse(selectedCourse)
    .filter(instructor => {
      // Search filter
      const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Price range filter
      const matchesPrice = instructor.hourlyRate >= priceRange[0] && instructor.hourlyRate <= priceRange[1];
      
      // Favorites filter
      const matchesFavorites = !showFavoritesOnly || favorites.has(instructor.id);
      
      return matchesSearch && matchesPrice && matchesFavorites;
    });

  return (
    <div className="min-h-screen flex flex-col bg-blue-900/70">
      <Header />
      
      {/* Flight Courses Drawer - Now floating */}
      <FlightCoursesDrawer onCourseSelect={setSelectedCourse} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="text-white mr-2">
              <Link to="/discounted-flight">
                <ArrowLeft className="mr-2 h-4 w-4" />
                חזרה
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-white px-0 mx-[240px]">מדריכי הטיסה שלנו</h1>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label className="text-white text-right block">חיפוש מדריך</Label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                <Input
                  type="text"
                  placeholder="חפש לפי שם או מיקום..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Favorites Toggle */}
            <div className="flex items-end justify-start">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="favorites"
                  checked={showFavoritesOnly}
                  onCheckedChange={(checked) => setShowFavoritesOnly(checked as boolean)}
                  className="border-white/40 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                />
                <Label htmlFor="favorites" className="text-white flex items-center gap-2 cursor-pointer">
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  הצג מועדפים בלבד ({favorites.size})
                </Label>
              </div>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3">
            <Label className="text-white text-right block">טווח מחירים לשעה</Label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                min={300}
                max={600}
                step={10}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-white/80 text-sm">
              <span>₪{priceRange[1]}</span>
              <span>₪{priceRange[0]}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-white/80 text-lg text-right">
            {selectedCourse === 'all' ? 'בחר את המדריך המתאים לך מתוך צוות המדריכים המקצועיים שלנו' : `מציג מדריכים עבור: ${selectedCourse === 'PPL' ? 'קורס טיס פרטי' : selectedCourse === 'CPL' ? 'קורס טיס מסחרי' : selectedCourse === 'ATPL' ? 'קורס טייס קווים' : selectedCourse === 'FI' ? 'קורס מדריך טיסה' : selectedCourse === 'IR' ? 'טיסת מכשירים' : selectedCourse === 'ME' ? 'טיסה דו-מנועית' : selectedCourse === 'היכרות' ? 'שיעור היכרות' : selectedCourse === 'מסלול מלא' ? 'מסלול מלא' : selectedCourse === 'תיאוריה' ? 'תיאוריה' : selectedCourse === 'סימולטור' ? 'סימולטור' : selectedCourse === 'ריענון' ? 'קורס ריענון' : selectedCourse === 'זוגי' ? 'שיעורים זוגיים' : selectedCourse === 'מלגות' ? 'מלגות וסיוע' : selectedCourse} (${filteredInstructors.length} מדריכים)`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
          {filteredInstructors.map(instructor => (
            <InstructorCard 
              key={instructor.id} 
              instructor={instructor}
              isFavorite={favorites.has(instructor.id)}
              onToggleFavorite={() => toggleFavorite(instructor.id)}
            />
          ))}
        </div>

        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/80 text-lg">לא נמצאו מדריכים עבור הקורס שנבחר</p>
          </div>
        )}

        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 text-right">הערות חשובות:</h3>
          <ul className="list-disc list-inside space-y-2 text-white/90 text-right">
            <li>כל המדריכים בעלי רשיון טיס מסחרי ובדוק</li>
            <li>ניתן לבטל או לשנות מועד עד 48 שעות לפני הטיסה</li>
            <li>הטיסות מתבצעות בכפוף לתנאי מזג האוויר</li>
            <li>יש להגיע 30 דקות לפני מועד הטיסה</li>
            <li>כל המטוסים עוברים בדיקות בטיחות יומיות</li>
            <li>ביטוח מקיף כלול בכל טיסה</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default InstructorDetails;
