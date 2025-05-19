
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const DiscountedFlight = () => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState("option1");

  const handlePurchase = () => {
    toast({
      title: "הזמנה בוצעה בהצלחה",
      description: "פרטי ההזמנה יישלחו למייל שלך",
    });
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
          <h1 className="text-3xl font-bold text-white">שעת טיסה מוזל</h1>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-800/50">
            <TabsTrigger value="student">תלמידים</TabsTrigger>
            <TabsTrigger value="instructor">
              <Link to="/instructor-details">מדריכים</Link>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="student">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
              {discountOptions.map((option) => (
                <Card 
                  key={option.id} 
                  className={`bg-white/10 backdrop-blur-md shadow-md border-pinterest-purple/20 transition-all duration-300 hover:shadow-xl ${
                    selectedOption === option.id ? "border-pinterest-purple" : ""
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                    <div className="text-3xl font-bold text-pinterest-purple mb-4">₪{option.price}</div>
                    
                    <div className="space-y-3 mb-6 text-white/90">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-pinterest-purple/70" />
                        <span>{option.hours} שעות</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-pinterest-purple/70" />
                        <span>תוקף: {option.validity}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-pinterest-purple/70" />
                        <span>{option.instructorType}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full ${
                        selectedOption === option.id 
                          ? "bg-pinterest-purple hover:bg-pinterest-dark-purple" 
                          : "bg-blue-700 hover:bg-blue-600"
                      }`}
                      onClick={handlePurchase}
                    >
                      רכישה
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-white/10 backdrop-blur-md shadow-md border-pinterest-purple/20 mt-8 p-6">
              <h3 className="text-xl font-bold text-white mb-4" dir="rtl">הערות חשובות:</h3>
              <ul className="list-disc list-inside space-y-2 text-white mr-4" dir="rtl">
                <li>המחירים כוללים מע"מ</li>
                <li>ניתן לבטל הזמנה עד 48 שעות לפני מועד הטיסה</li>
                <li>הטיסות מתבצעות בכפוף לתנאי מזג האוויר</li>
                <li>יש להגיע 30 דקות לפני מועד הטיסה</li>
                <li>ניתן להזמין שעות נוספות בתיאום מראש</li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Sample discount options data
const discountOptions = [
  {
    id: "option1",
    title: "חבילה בסיסית",
    price: 500,
    hours: 1,
    validity: "חודש",
    instructorType: "מדריך מתחיל"
  },
  {
    id: "option2",
    title: "חבילה מורחבת",
    price: 1200,
    hours: 3,
    validity: "3 חודשים",
    instructorType: "מדריך בכיר"
  },
  {
    id: "option3",
    title: "חבילה מקצועית",
    price: 2000,
    hours: 5,
    validity: "6 חודשים",
    instructorType: "מדריך בכיר"
  }
];

export default DiscountedFlight;
