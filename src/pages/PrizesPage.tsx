
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trophy, Award, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const prizes = [
  {
    id: 1,
    title: "קורס טייס אזרחי מלא",
    value: "₪50,000",
    description: "קורס טייס אזרחי מלא הכולל את כל שעות ההטסה הנדרשות",
    icon: <Trophy className="h-8 w-8 text-yellow-500" />
  },
  {
    id: 2,
    title: "חצי קורס טייס",
    value: "₪25,000",
    description: "מימון חצי מעלות קורס הטיס האזרחי",
    icon: <Trophy className="h-8 w-8 text-gray-400" />
  },
  {
    id: 3,
    title: "מיני אייפד של אפל",
    value: "₪2,000",
    description: "מיני אייפד של אפל החדש - הדגם האחרון",
    icon: <Trophy className="h-8 w-8 text-amber-600" />
  },
  {
    id: 4,
    title: "שעת טיסת היכרות",
    value: "₪500",
    description: "שעת טיסת היכרות עם מדריך בכיר",
    icon: <Award className="h-8 w-8 text-blue-400" />
  },
  {
    id: 5,
    title: "שובר לרכישה באתר",
    value: "₪500",
    description: "שובר לרכישת מוצרים באתר",
    icon: <Gift className="h-8 w-8 text-pink-400" />
  }
];

const PrizesPage = () => {
  const [raffleParticipants] = useState(1560); // Example value
  const maxRaffleParticipants = 3000;
  const raffleProgress = Math.round((raffleParticipants / maxRaffleParticipants) * 100);

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
          <h1 className="text-3xl font-bold text-white">פרסי ההגרלה</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <div className="text-white mb-4 sm:mb-0">
            <h2 className="text-xl font-bold">התקדמות ההגרלה</h2>
            <p className="text-sm">ההגרלה תתקיים כאשר נגיע ל-3,000 משתתפים</p>
          </div>
          <div className="w-full sm:w-1/2">
            <div className="flex justify-between text-white mb-1">
              <span>משתתפים כרגע</span>
              <span>{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</span>
            </div>
            <Progress value={raffleProgress} className="h-2 bg-gray-300/30" />
          </div>
        </div>

        <div className="space-y-6" dir="rtl">
          {prizes.map((prize, index) => (
            <Card 
              key={prize.id}
              className={`bg-white/10 backdrop-blur-md shadow-md transition-all hover:shadow-xl border-l-4 ${
                index === 0 ? "border-l-yellow-500" : 
                index === 1 ? "border-l-gray-400" : 
                index === 2 ? "border-l-amber-600" : 
                "border-l-pinterest-purple"
              }`}
            >
              <CardContent className="p-6 flex items-center">
                <div className="bg-gray-800/50 rounded-full p-3 flex items-center justify-center mr-5">
                  {prize.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center">
                        {prize.title}
                        <span className="text-xs bg-pinterest-purple/50 px-2 py-0.5 rounded-full ml-2">
                          מקום {prize.id}
                        </span>
                      </h3>
                      <p className="text-gray-200 mt-1">{prize.description}</p>
                    </div>
                    <div className="text-2xl font-bold text-pinterest-purple">{prize.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-white/10 backdrop-blur-md shadow-md border-pinterest-purple/20 p-6 mt-6">
            <div className="text-white" dir="rtl">
              <h3 className="text-xl font-bold border-b border-pinterest-purple/30 pb-2 mb-4">תנאי ההגרלה</h3>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>ההשתתפות בהגרלה פתוחה לכל הנרשמים לאתר</li>
                <li>ההגרלה תתקיים כאשר נגיע ל-3,000 משתתפים</li>
                <li>ההגרלה תתקיים בשידור חי בערוץ היוטיוב שלנו</li>
                <li>לא ניתן להמיר את הפרסים בכסף מזומן</li>
                <li>הזכייה בפרס אחד אינה מבטלת את האפשרות לזכות בפרסים אחרים בהגרלות עתידיות</li>
              </ul>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PrizesPage;
