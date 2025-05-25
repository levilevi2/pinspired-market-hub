
import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import InstructorCard, { Instructor } from "@/components/InstructorCard";

const InstructorDetails: React.FC = () => {
  const instructors: Instructor[] = [
    {
      id: "inst1",
      name: "יוסי כהן",
      experience: 15,
      hourlyRate: 450,
      rating: 4.8,
      totalFlights: 1200,
      specialties: ["טיסות לילה", "ניווט מתקדם", "הדרכת מתחילים"],
      aircraftTypes: ["Cessna 172", "Piper Cherokee", "Diamond DA40"],
      location: "שדה התעופה הרצליה",
      description: "מדריך טיסה מנוסה עם התמחות בהדרכת תלמידים מתחילים. בעל ניסיון רב בטיסות אווירובטיקה וניווט מתקדם.",
      image: "/api/placeholder/64/64",
      flightSettings: {
        maxAltitude: "3,000 רגל",
        flightZone: "צפון תל אביב",
        aircraftModel: "Cessna 172SP",
        safetyLevel: "גבוהה מאוד"
      }
    },
    {
      id: "inst2", 
      name: "רחל לוי",
      experience: 12,
      hourlyRate: 420,
      rating: 4.9,
      totalFlights: 950,
      specialties: ["טיסות פנורמיות", "צילום אווירי", "טיסות חוף"],
      aircraftTypes: ["Piper Cherokee", "Cessna 182", "Beechcraft Bonanza"],
      location: "שדה התעופה בן גוריון",
      description: "מדריכה מקצועית עם התמחות בטיסות פנורמיות וצילום אווירי. מתמחה בהדרכה עדינה ומותאמת אישית.",
      image: "/api/placeholder/64/64",
      flightSettings: {
        maxAltitude: "2,500 רגל",
        flightZone: "חוף הים התיכון",
        aircraftModel: "Piper PA-28",
        safetyLevel: "גבוהה"
      }
    },
    {
      id: "inst3",
      name: "דוד מזרחי", 
      experience: 20,
      hourlyRate: 500,
      rating: 4.7,
      totalFlights: 1800,
      specialties: ["אווירובטיקה", "טיסות מתקדמות", "הכנה לבחינות"],
      aircraftTypes: ["Extra 300", "Pitts Special", "Cessna 172"],
      location: "שדה התעופה קרית שמונה",
      description: "מדריך בכיר עם ניסיון נרחב באווירובטיקה וטיסות מתקדמות. מתמחה בהכנת תלמידים לבחינות רשיון טיס מסחרי.",
      image: "/api/placeholder/64/64",
      flightSettings: {
        maxAltitude: "5,000 רגל",
        flightZone: "צפון ישראל",
        aircraftModel: "Extra 300L",
        safetyLevel: "גבוהה"
      }
    },
    {
      id: "inst4",
      name: "מירי בן דוד",
      experience: 8,
      hourlyRate: 380,
      rating: 4.6,
      totalFlights: 600,
      specialties: ["טיסות תיירות", "ניווט בסיסי", "הדרכת נשים"],
      aircraftTypes: ["Cessna 150", "Piper Cherokee", "Diamond DA20"],
      location: "שדה התעופה חיפה",
      description: "מדריכה צעירה ומקצועית עם גישה חדשנית להדרכה. מתמחה בטיסות תיירות והדרכת נשים בסביבה נוחה.",
      image: "/api/placeholder/64/64",
      flightSettings: {
        maxAltitude: "2,000 רגל",
        flightZone: "מפרץ חיפה",
        aircraftModel: "Cessna 150M",
        safetyLevel: "גבוהה"
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-blue-900/70">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" asChild className="text-white mr-2">
            <Link to="/discounted-flight">
              <ArrowLeft className="mr-2 h-4 w-4" />
              חזרה
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-white">מדריכי הטיסה שלנו</h1>
        </div>

        <div className="mb-6">
          <p className="text-white/80 text-lg text-right">
            בחר את המדריך המתאים לך מתוך צוות המדריכים המקצועיים שלנו
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>

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
