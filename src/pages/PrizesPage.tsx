
import { useState } from "react";
import Header from "@/components/Header";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
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
  const [raffleParticipants] = useState(1560);
  const maxRaffleParticipants = 3000;
  const raffleProgress = Math.round((raffleParticipants / maxRaffleParticipants) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 relative">
      <AnimatedWorldMap />
      <div className="relative z-10">
        <Header />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="sm" asChild className="text-foreground mr-2">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                חזרה
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground">פרסי ההגרלה</h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 transition-all duration-300">
            <div className="text-foreground mb-4 sm:mb-0">
              <h2 className="text-xl font-bold">התקדמות ההגרלה</h2>
              <p className="text-sm text-muted-foreground">ההגרלה תתקיים כאשר נגיע ל-3,000 משתתפים</p>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="flex justify-between text-foreground mb-1">
                <span>משתתפים כרגע</span>
                <span>{raffleParticipants.toLocaleString()} / {maxRaffleParticipants.toLocaleString()}</span>
              </div>
              <Progress value={raffleProgress} className="h-2" />
            </div>
          </div>

          <div className="space-y-6" dir="rtl">
            {prizes.map((prize, index) => (
              <Card 
                key={prize.id}
                className={`bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl hover:bg-card/80 transition-all duration-300 border-l-4 ${
                  index === 0 ? "border-l-yellow-500" : 
                  index === 1 ? "border-l-gray-400" : 
                  index === 2 ? "border-l-amber-600" : 
                  "border-l-primary"
                }`}
              >
                <CardContent className="p-6 flex items-center">
                  <div className="bg-muted/20 rounded-full p-3 flex items-center justify-center mr-5">
                    {prize.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-foreground flex items-center">
                          {prize.title}
                          <span className="text-xs bg-primary/50 px-2 py-0.5 rounded-full ml-2 text-primary-foreground">
                            מקום {prize.id}
                          </span>
                        </h3>
                        <p className="text-muted-foreground mt-1">{prize.description}</p>
                      </div>
                      <div className="text-2xl font-bold text-primary">{prize.value}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 mt-6 hover:bg-card/80 transition-all duration-300">
              <div className="text-foreground" dir="rtl">
                <h3 className="text-xl font-bold border-b border-border/30 pb-2 mb-4">תנאי ההגרלה</h3>
                <ul className="list-disc list-inside space-y-2 mr-4 text-muted-foreground">
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
    </div>
  );
};

export default PrizesPage;
