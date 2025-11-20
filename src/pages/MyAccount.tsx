import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, DollarSign, Clock } from "lucide-react";
import { toast } from "sonner";

interface Purchase {
  id: string;
  instructor_name: string;
  amount: number;
  purchase_date: string;
  notes: string | null;
}

interface FlightHour {
  id: string;
  instructor_name: string;
  hours: number;
  flight_date: string;
  notes: string | null;
}

const MyAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [flightHours, setFlightHours] = useState<FlightHour[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for adding new flight hours
  const [showAddHours, setShowAddHours] = useState(false);
  const [newHour, setNewHour] = useState({
    instructor_name: "",
    hours: "",
    flight_date: "",
    notes: ""
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/login");
      return;
    }

    setUser(user);
    await loadData(user.id);
  };

  const loadData = async (userId: string) => {
    try {
      setLoading(true);

      // Load purchases
      const { data: purchasesData, error: purchasesError } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", userId)
        .order("purchase_date", { ascending: false });

      if (purchasesError) throw purchasesError;
      setPurchases(purchasesData || []);

      // Load flight hours
      const { data: hoursData, error: hoursError } = await supabase
        .from("flight_hours")
        .select("*")
        .eq("user_id", userId)
        .order("flight_date", { ascending: false });

      if (hoursError) throw hoursError;
      setFlightHours(hoursData || []);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("שגיאה בטעינת הנתונים");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFlightHours = async () => {
    if (!user || !newHour.instructor_name || !newHour.hours || !newHour.flight_date) {
      toast.error("נא למלא את כל השדות הנדרשים");
      return;
    }

    try {
      const { error } = await supabase
        .from("flight_hours")
        .insert({
          user_id: user.id,
          instructor_name: newHour.instructor_name,
          hours: parseFloat(newHour.hours),
          flight_date: newHour.flight_date,
          notes: newHour.notes || null
        });

      if (error) throw error;

      toast.success("שעות הטיסה נוספו בהצלחה");
      setNewHour({ instructor_name: "", hours: "", flight_date: "", notes: "" });
      setShowAddHours(false);
      await loadData(user.id);
    } catch (error) {
      console.error("Error adding flight hours:", error);
      toast.error("שגיאה בהוספת שעות הטיסה");
    }
  };

  const handleDeleteFlightHour = async (id: string) => {
    try {
      const { error } = await supabase
        .from("flight_hours")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("שעות הטיסה נמחקו בהצלחה");
      await loadData(user!.id);
    } catch (error) {
      console.error("Error deleting flight hours:", error);
      toast.error("שגיאה במחיקת שעות הטיסה");
    }
  };

  // Calculate totals
  const totalSpent = purchases.reduce((sum, p) => sum + p.amount, 0);
  const totalHours = flightHours.reduce((sum, h) => sum + h.hours, 0);

  // Get unique instructors from both purchases and flight hours
  const uniqueInstructors = Array.from(
    new Set([
      ...purchases.map(p => p.instructor_name),
      ...flightHours.map(h => h.instructor_name)
    ])
  );

  // Calculate stats per instructor
  const instructorStats = uniqueInstructors.map(instructor => {
    const instructorPurchases = purchases.filter(p => p.instructor_name === instructor);
    const instructorHours = flightHours.filter(h => h.instructor_name === instructor);
    
    return {
      name: instructor,
      spent: instructorPurchases.reduce((sum, p) => sum + p.amount, 0),
      hours: instructorHours.reduce((sum, h) => sum + h.hours, 0)
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-blue-900 to-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center text-white">
          <p>טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-blue-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-white hover:text-white/80 mb-6">
          <ArrowLeft className="ml-2 h-4 w-4" />
          חזרה לעמוד הראשי
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8 text-right">האיזור האישי שלי</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-end">
                <DollarSign className="h-5 w-5" />
                סה"כ הוצאות
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white text-right">₪{totalSpent.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-end">
                <Clock className="h-5 w-5" />
                סה"כ שעות טיסה
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white text-right">{totalHours.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-end">
                מספר מדריכים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white text-right">{uniqueInstructors.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats per Instructor */}
        {instructorStats.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-right">סטטיסטיקה לפי מדריך</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instructorStats.map((stat) => (
                  <div key={stat.name} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                    <div className="flex gap-6">
                      <span className="text-white/80">{stat.hours.toFixed(2)} שעות</span>
                      <span className="text-white/80">₪{stat.spent.toFixed(2)}</span>
                    </div>
                    <span className="text-white font-semibold">{stat.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Flight Hours Section */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setShowAddHours(!showAddHours)}
                className="bg-accent hover:bg-accent/80"
              >
                <Plus className="ml-2 h-4 w-4" />
                הוסף שעות טיסה
              </Button>
              <CardTitle className="text-white text-right">שעות טיסה שבוצעו</CardTitle>
            </div>
            <CardDescription className="text-white/60 text-right">
              ניהול ומעקב אחר שעות הטיסה שלך
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showAddHours && (
              <div className="mb-6 p-4 bg-white/5 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white text-right block">מדריך</Label>
                    <Select value={newHour.instructor_name} onValueChange={(value) => setNewHour({ ...newHour, instructor_name: value })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="בחר מדריך" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueInstructors.map((instructor) => (
                          <SelectItem key={instructor} value={instructor}>
                            {instructor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-right block">מספר שעות</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={newHour.hours}
                      onChange={(e) => setNewHour({ ...newHour, hours: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="1.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-right block">תאריך הטיסה</Label>
                    <Input
                      type="date"
                      value={newHour.flight_date}
                      onChange={(e) => setNewHour({ ...newHour, flight_date: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-right block">הערות (אופציונלי)</Label>
                    <Textarea
                      value={newHour.notes}
                      onChange={(e) => setNewHour({ ...newHour, notes: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="הערות על הטיסה..."
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowAddHours(false)}>
                    ביטול
                  </Button>
                  <Button onClick={handleAddFlightHours} className="bg-accent hover:bg-accent/80">
                    שמור
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {flightHours.length === 0 ? (
                <p className="text-white/60 text-right">עדיין לא נרשמו שעות טיסה</p>
              ) : (
                flightHours.map((hour) => (
                  <div key={hour.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteFlightHour(hour.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-right mr-4">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-white/60 text-sm">
                          {new Date(hour.flight_date).toLocaleDateString('he-IL')}
                        </span>
                        <span className="text-white font-semibold">{hour.instructor_name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        {hour.notes && (
                          <span className="text-white/60 text-sm">{hour.notes}</span>
                        )}
                        <span className="text-accent font-semibold">{hour.hours} שעות</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Purchases Section */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-right">היסטוריית רכישות</CardTitle>
            <CardDescription className="text-white/60 text-right">
              כל הרכישות שבוצעו דרך האתר
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {purchases.length === 0 ? (
                <p className="text-white/60 text-right">עדיין לא בוצעו רכישות</p>
              ) : (
                purchases.map((purchase) => (
                  <div key={purchase.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white/60 text-sm">
                        {new Date(purchase.purchase_date).toLocaleDateString('he-IL')}
                      </span>
                      <span className="text-white font-semibold">{purchase.instructor_name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      {purchase.notes && (
                        <span className="text-white/60 text-sm">{purchase.notes}</span>
                      )}
                      <span className="text-accent font-bold text-lg">₪{purchase.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyAccount;
