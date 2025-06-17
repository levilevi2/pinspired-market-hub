
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GraduationCap, Plane, Users, Clock, BookOpen, Trophy, Heart, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    title: "PPL – קורס טיס פרטי (עד 50 שעות)",
    icon: Plane,
    description: "הקורס הבסיסי לקבלת רישיון טיס פרטי",
    filterKey: "PPL"
  },
  {
    title: "CPL – קורס טיס מסחרי",
    icon: GraduationCap,
    description: "קורס מתקדם לטייסים מקצועיים",
    filterKey: "CPL"
  },
  {
    title: "ATPL – קורס טייס קווים",
    icon: Trophy,
    description: "הקורס המתקדם ביותר לטייסי חברות תעופה",
    filterKey: "ATPL"
  },
  {
    title: "FI – קורס מדריך טיסה",
    icon: Users,
    description: "הכשרה להדרכת טייסים חדשים",
    filterKey: "FI"
  },
  {
    title: "IR – טיסת מכשירים (לילה / עיוור)",
    icon: Clock,
    description: "קורס טיסה בתנאי ראות מוגבלת",
    filterKey: "IR"
  },
  {
    title: "ME – טיסה על מטוס דו-מנועי",
    icon: Plane,
    description: "הכשרה לטיסה על מטוסים מתקדמים",
    filterKey: "ME"
  },
  {
    title: "שיעור טיסה היכרות",
    icon: Heart,
    description: "שיעור ראשון לחוויית טיסה",
    filterKey: "היכרות"
  },
  {
    title: "מסלול מלא – מ-PPL ל-ATPL",
    icon: Trophy,
    description: "מסלול השלם מטייס פרטי לטייס קווים",
    filterKey: "מסלול מלא"
  },
  {
    title: "חבילת שיעורי טיסה מוזלת",
    icon: DollarSign,
    description: "חבילות במחירים מיוחדים",
    filterKey: "חבילה מוזלת"
  },
  {
    title: "תיאום שיעור עם מדריך",
    icon: Users,
    description: "קביעת שיעור ישירות עם מדריך",
    filterKey: "תיאום"
  },
  {
    title: "תיאוריה בלבד – הכנה למבחנים",
    icon: BookOpen,
    description: "לימוד תיאורטי למבחני רישוי",
    filterKey: "תיאוריה"
  },
  {
    title: "סימולטור טיסה מתקדם",
    icon: Plane,
    description: "אימון בסימולטור מקצועי",
    filterKey: "סימולטור"
  },
  {
    title: "קורס ריענון / חזרה לטיסה",
    icon: Clock,
    description: "קורס לטייסים חוזרים לפעילות",
    filterKey: "ריענון"
  },
  {
    title: "שיעור טיס זוגי / מתנה",
    icon: Heart,
    description: "שיעור טיסה לזוג או כמתנה",
    filterKey: "זוגי"
  },
  {
    title: "מלגות וסיוע כלכלי",
    icon: DollarSign,
    description: "תמיכה כלכלית לקורסי טיסה",
    filterKey: "מלגות"
  }
];

interface FlightCoursesDrawerProps {
  onCourseSelect?: (filterKey: string) => void;
}

const FlightCoursesDrawer = ({ onCourseSelect }: FlightCoursesDrawerProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCourseClick = (filterKey: string) => {
    if (onCourseSelect) {
      onCourseSelect(filterKey);
    } else {
      // Default behavior: navigate to instructor details with filter
      navigate(`/instructor-details?course=${filterKey}`);
    }
    setOpen(false);
  };

  const handleMainButtonClick = () => {
    const productSection = document.querySelector('h1');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowAllInstructors = () => {
    if (onCourseSelect) {
      onCourseSelect('all');
    } else {
      // Default behavior: navigate to instructor details
      navigate('/instructor-details');
    }
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
          onClick={handleMainButtonClick}
        >
          <GraduationCap className="mr-2 h-5 w-5" />
          קורסי טיסה
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] bg-blue-900/50 backdrop-blur-md border-none shadow-none">
        <div className="mx-auto w-full max-w-sm bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20">
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl font-bold">קורסי טיסה ושירותים</DrawerTitle>
            <DrawerDescription className="text-center">
              בחרו מתוך מגוון הקורסים והשירותים שלנו
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 max-h-[50vh] overflow-y-auto">
            <div className="space-y-3">
              {courses.map((course, index) => {
                const IconComponent = course.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => handleCourseClick(course.filterKey)}
                  >
                    <IconComponent className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 truncate">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {course.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <DrawerFooter>
            <Button 
              onClick={handleShowAllInstructors}
              className="mb-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              הצג את כל המדריכים
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">סגור</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FlightCoursesDrawer;
