
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
  const [user, setUser] = useState<{ name: string; isLoggedIn: boolean } | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const { items } = useCart();

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
          <h1 className="text-3xl font-bold text-white">כניסה להגרלה</h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-md shadow-xl border-pinterest-purple/20 p-6">
          <div className="space-y-6" dir="rtl">
            <h2 className="text-2xl font-bold text-white border-b border-pinterest-purple/30 pb-2">
              תנאי השתתפות בהגרלה
            </h2>
            
            <div className="space-y-4 text-white">
              <p className="text-lg">ברוכים הבאים להגרלה השנתית שלנו! להלן התנאים להשתתפות:</p>
              
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>ההשתתפות מותרת לחברי מועדון בלבד</li>
                <li>יש להשלים לפחות 10 שעות טיסה בשנה האחרונה</li>
                <li>יש לרכוש לפחות פריט אחד מקטגוריית "ציוד לטייס"</li>
                <li>יש למלא את כל הפרטים האישיים בטופס ההרשמה</li>
                <li>ההרשמה תסתיים בתאריך 31.12.2025</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-pinterest-purple mt-6">פרסים</h3>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>פרס ראשון: 10 שעות טיסה חינם</li>
                <li>פרס שני: סט ציוד טיסה מקצועי</li>
                <li>פרס שלישי: שובר בשווי ₪1,000 למוצרי החנות</li>
              </ul>
              
              <div className="bg-pinterest-purple/20 p-4 rounded-md mt-6">
                <h3 className="text-xl font-semibold text-pinterest-purple">שימו לב!</h3>
                <p>ההגרלה תתקיים כאשר נגיע ל-3,000 משתתפים. עקבו אחר מספר המשתתפים בדף הבית.</p>
              </div>
            </div>
            
            <Button 
              onClick={handleRaffleRegistration}
              className="w-full mt-8 bg-pinterest-purple hover:bg-pinterest-dark-purple text-white"
            >
              הירשם להגרלה
            </Button>
          </div>
        </Card>
      </main>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">הגרלה</DialogTitle>
          </DialogHeader>
          <div className="space-y-4" dir="rtl">
            <p className="text-center">{dialogMessage}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={navigateToShop} className="bg-pinterest-purple hover:bg-pinterest-dark-purple">
                עבור לחנות
              </Button>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                סגור
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RaffleEntry;
