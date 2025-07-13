import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
const RaffleEntry = () => {
  const [user, setUser] = useState<{
    name: string;
    isLoggedIn: boolean;
  } | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const {
    items
  } = useCart();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleRaffleRegistration = () => {
    // Check if user is logged in
    if (!user?.isLoggedIn) {
      setDialogMessage("כדי להירשם להגרלה עליך לרכוש מוצר מהאתר. הרכישה אוטומטית רושמת אותך להגרלה ותקבל מספר משתתף לאחר הקנייה.");
      setShowDialog(true);
      return;
    }

    // Check if user has purchased anything
    const hasPurchases = items.length > 0 || localStorage.getItem('userPurchases');
    if (hasPurchases) {
      setDialogMessage("אתה כבר רשום להגרלה! אם אתה רוצה עוד כרטיס להגרלה עליך לרכוש עוד מוצר מהאתר.");
      setShowDialog(true);
    } else {
      setDialogMessage("כדי להירשם להגרלה עליך לרכוש מוצר מהאתר. הרכישה אוטומטית רושמת אותך להגרלה ותקבל מספר משתתף לאחר הקנייה.");
      setShowDialog(true);
    }
  };
  const navigateToShop = () => {
    setShowDialog(false);
    window.location.href = "/";
  };
  return <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" asChild className="text-white mr-2 hover:bg-white/20">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              חזרה
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">כניסה להגרלה</h1>
        </div>

        <Card className="glass-card p-8 float-animation">
          <div dir="rtl" className="space-y-6 bg-blue-200">
            <h2 className="text-2xl font-bold text-white border-b border-white/30 pb-3">
              תנאי השתתפות בהגרלה
            </h2>
            
            <div className="space-y-4 text-white">
              <p className="text-lg opacity-90">ברוכים הבאים להגרלה השנתית שלנו! להלן התנאים להשתתפות:</p>
              
              <ul className="list-disc list-inside space-y-3 mr-4 opacity-90">
                <li>ההשתתפות מותרת לחברי מועדון בלבד</li>
                <li>ניתן לרכוש מספר מוצרים להגדלת הסיכויים לזכייה</li>
                <li>יש לרכוש לפחות פריט אחד מקטגוריית "ציוד לטייס"</li>
                <li>יש למלא את כל הפרטים האישיים בטופס ההרשמה</li>
                <li>ההרשמה תסתיים בתאריך 31.12.2025</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-8">פרסים</h3>
              <ul className="list-disc list-inside space-y-3 mr-4 opacity-90">
                <li>פרס ראשון: קורס טיס רשיון פרטי 50 שעות בהרצליה</li>
                <li>פרס שני: קורס טיס אולטרלייט</li>
                <li>פרס שלישי: רחפן DJI בשווי 4000 שקלים</li>
              </ul>
              
              <div className="backdrop-blur-sm p-6 rounded-xl mt-8 border border-white/30 bg-red-400 my-[6px] py-[3px] mx-[81px] px-[18px]">
                <h3 className="text-xl font-semibold text-white mb-3">שימו לב!</h3>
                <p className="opacity-90">ההגרלה תתקיים כאשר נגיע ל-3,000 משתתפים. עקבו אחר מספר המשתתפים בדף הבית.
לא ניתו להמיר את הפרסים בכסף מזומן
ניתן להעביר לחבר או משפחה את הזכייה</p>
              </div>
            </div>
            
            <Button onClick={handleRaffleRegistration} className="w-full mt-8 modern-button backdrop-blur-sm border border-white/30 text-white text-lg py-3 h-auto bg-orange-500 hover:bg-orange-400">
              הירשם להגרלה
            </Button>
          </div>
        </Card>
      </main>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md glass-card border-white/30">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-white">הגרלה</DialogTitle>
          </DialogHeader>
          <div className="space-y-4" dir="rtl">
            <p className="text-center text-white opacity-90">{dialogMessage}</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={navigateToShop} className="modern-button bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white">
                עבור לחנות
              </Button>
              <Button variant="outline" onClick={() => setShowDialog(false)} className="border-white/30 text-white hover:bg-white/10">
                סגור
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default RaffleEntry;