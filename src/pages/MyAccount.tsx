import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  ShoppingBag, 
  Plane, 
  Clock, 
  CalendarDays, 
  User, 
  CheckCircle2, 
  RefreshCw,
  ChevronRight
} from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";
import { he } from "date-fns/locale";
import Header from "@/components/Header";

interface Purchase {
  id: string;
  amount: number;
  instructor_name: string;
  purchase_date: string;
  notes: string | null;
}

interface ScheduledLesson {
  id: string;
  instructor_id: string;
  instructor_name: string;
  lesson_date: string;
  lesson_time: string;
  lesson_number: number;
  status: string;
  hours_approved: boolean;
  hours_count: number;
  notes: string | null;
  original_date: string | null;
  original_time: string | null;
}

interface FlightHour {
  id: string;
  hours: number;
  instructor_name: string;
  flight_date: string;
  notes: string | null;
}

const availableTimeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

const MyAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [lessons, setLessons] = useState<ScheduledLesson[]>([]);
  const [flightHours, setFlightHours] = useState<FlightHour[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<ScheduledLesson | null>(null);
  const [newDate, setNewDate] = useState<Date | undefined>();
  const [newTime, setNewTime] = useState<string>("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }
    setUser(session.user);
    await loadData(session.user.id);
  };

  const loadData = async (userId: string) => {
    setLoading(true);
    try {
      // Load purchases
      const { data: purchasesData, error: purchasesError } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", userId)
        .order("purchase_date", { ascending: false });

      if (purchasesError) throw purchasesError;
      setPurchases(purchasesData || []);

      // Load scheduled lessons
      const { data: lessonsData, error: lessonsError } = await supabase
        .from("scheduled_lessons")
        .select("*")
        .eq("user_id", userId)
        .order("lesson_date", { ascending: true });

      if (lessonsError) throw lessonsError;
      setLessons(lessonsData || []);

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
      toast({
        title: "שגיאה בטעינת הנתונים",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const approveHours = async (lesson: ScheduledLesson) => {
    try {
      // Update lesson as approved
      const { error: updateError } = await supabase
        .from("scheduled_lessons")
        .update({ hours_approved: true, status: "completed" })
        .eq("id", lesson.id);

      if (updateError) throw updateError;

      // Add to flight hours
      const { error: insertError } = await supabase
        .from("flight_hours")
        .insert({
          user_id: user.id,
          hours: lesson.hours_count,
          instructor_name: lesson.instructor_name,
          flight_date: lesson.lesson_date,
          notes: `שיעור מספר ${lesson.lesson_number}`
        });

      if (insertError) throw insertError;

      toast({
        title: "שעות הטיסה אושרו בהצלחה!",
      });
      
      loadData(user.id);
    } catch (error) {
      console.error("Error approving hours:", error);
      toast({
        title: "שגיאה באישור השעות",
        variant: "destructive"
      });
    }
  };

  const rescheduleLesson = async () => {
    if (!selectedLesson || !newDate || !newTime) return;

    try {
      const { error } = await supabase
        .from("scheduled_lessons")
        .update({
          lesson_date: format(newDate, "yyyy-MM-dd"),
          lesson_time: newTime,
          status: "rescheduled",
          original_date: selectedLesson.lesson_date,
          original_time: selectedLesson.lesson_time
        })
        .eq("id", selectedLesson.id);

      if (error) throw error;

      toast({
        title: "השיעור הוזז בהצלחה!",
        description: `נקבע ל-${format(newDate, "dd/MM/yyyy")} בשעה ${newTime}`
      });
      
      setRescheduleDialogOpen(false);
      setSelectedLesson(null);
      setNewDate(undefined);
      setNewTime("");
      loadData(user.id);
    } catch (error) {
      console.error("Error rescheduling:", error);
      toast({
        title: "שגיאה בהזזת השיעור",
        variant: "destructive"
      });
    }
  };

  const getLessonsForDate = (date: Date) => {
    return lessons.filter(lesson => 
      isSameDay(parseISO(lesson.lesson_date), date)
    );
  };

  const totalSpending = purchases.reduce((sum, p) => sum + Number(p.amount), 0);
  const totalFlightHours = flightHours.reduce((sum, h) => sum + Number(h.hours), 0);
  const pendingApprovalCount = lessons.filter(l => l.status === "completed" && !l.hours_approved).length;
  const upcomingLessons = lessons.filter(l => l.status === "scheduled" && new Date(l.lesson_date) >= new Date());

  const selectedDateLessons = selectedDate ? getLessonsForDate(selectedDate) : [];

  // Get dates that have lessons for calendar highlighting
  const lessonDates = lessons.map(l => parseISO(l.lesson_date));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <h1 className="text-3xl font-bold text-foreground mb-8">האיזור האישי שלי</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/15">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">סה"כ הוצאות</p>
                  <p className="text-2xl font-bold text-foreground">₪{totalSpending.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/15">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">שעות טיסה</p>
                  <p className="text-2xl font-bold text-foreground">{totalFlightHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/15">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/20">
                  <Plane className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">שיעורים קרובים</p>
                  <p className="text-2xl font-bold text-foreground">{upcomingLessons.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/15">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-yellow-500/20">
                  <CheckCircle2 className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">ממתינים לאישור</p>
                  <p className="text-2xl font-bold text-foreground">{pendingApprovalCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/[0.05] border border-white/10">
            <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CalendarDays className="h-4 w-4 ml-2" />
              לוח שיעורים
            </TabsTrigger>
            <TabsTrigger value="lessons" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Plane className="h-4 w-4 ml-2" />
              שיעורי טיסה
            </TabsTrigger>
            <TabsTrigger value="purchases" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShoppingBag className="h-4 w-4 ml-2" />
              רכישות
            </TabsTrigger>
          </TabsList>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/15">
                <CardHeader>
                  <CardTitle className="text-foreground">יומן שיעורי טיסה</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    locale={he}
                    className="rounded-md border border-white/10 p-3 pointer-events-auto"
                    modifiers={{
                      hasLesson: lessonDates
                    }}
                    modifiersStyles={{
                      hasLesson: {
                        backgroundColor: "hsl(var(--primary) / 0.3)",
                        borderRadius: "50%"
                      }
                    }}
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/15">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    שיעורים ב-{selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateLessons.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">אין שיעורים מתוכננים לתאריך זה</p>
                  ) : (
                    <div className="space-y-4">
                      {selectedDateLessons.map((lesson) => (
                        <div 
                          key={lesson.id}
                          className="p-4 rounded-xl bg-white/[0.05] border border-white/10 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-primary/20">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{lesson.instructor_name}</p>
                                <p className="text-sm text-muted-foreground">שיעור #{lesson.lesson_number}</p>
                              </div>
                            </div>
                            <Badge 
                              variant={
                                lesson.status === "completed" ? "default" :
                                lesson.status === "cancelled" ? "destructive" :
                                lesson.status === "rescheduled" ? "secondary" : "outline"
                              }
                            >
                              {lesson.status === "scheduled" && "מתוכנן"}
                              {lesson.status === "completed" && "הושלם"}
                              {lesson.status === "cancelled" && "בוטל"}
                              {lesson.status === "rescheduled" && "הוזז"}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{lesson.lesson_time}</span>
                            <span>•</span>
                            <span>{lesson.hours_count} שעות</span>
                          </div>

                          {lesson.status === "scheduled" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-white/20 hover:bg-white/10"
                              onClick={() => {
                                setSelectedLesson(lesson);
                                setRescheduleDialogOpen(true);
                              }}
                            >
                              <RefreshCw className="h-4 w-4 ml-2" />
                              הזז שיעור
                            </Button>
                          )}

                          {lesson.status === "completed" && !lesson.hours_approved && (
                            <Button
                              size="sm"
                              className="w-full bg-green-600 hover:bg-green-700"
                              onClick={() => approveHours(lesson)}
                            >
                              <CheckCircle2 className="h-4 w-4 ml-2" />
                              אשר שעות טיסה
                            </Button>
                          )}

                          {lesson.hours_approved && (
                            <div className="flex items-center gap-2 text-green-500 text-sm">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>שעות אושרו</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons">
            <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/15">
              <CardHeader>
                <CardTitle className="text-foreground">כל שיעורי הטיסה</CardTitle>
              </CardHeader>
              <CardContent>
                {lessons.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">אין שיעורים רשומים</p>
                ) : (
                  <div className="space-y-3">
                    {lessons.map((lesson) => (
                      <div 
                        key={lesson.id}
                        className="p-4 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-primary/20">
                            <Plane className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">שיעור #{lesson.lesson_number} - {lesson.instructor_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(parseISO(lesson.lesson_date), "dd/MM/yyyy")} בשעה {lesson.lesson_time}
                            </p>
                            {lesson.original_date && (
                              <p className="text-xs text-yellow-500">
                                הוזז מ-{format(parseISO(lesson.original_date), "dd/MM/yyyy")} {lesson.original_time}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant={
                              lesson.hours_approved ? "default" :
                              lesson.status === "completed" ? "secondary" :
                              lesson.status === "cancelled" ? "destructive" : "outline"
                            }
                          >
                            {lesson.hours_approved ? `${lesson.hours_count} שעות מאושרות` :
                             lesson.status === "scheduled" ? "מתוכנן" :
                             lesson.status === "completed" ? "ממתין לאישור" :
                             lesson.status === "cancelled" ? "בוטל" : "הוזז"}
                          </Badge>
                          {lesson.status === "scheduled" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedLesson(lesson);
                                setRescheduleDialogOpen(true);
                              }}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Flight Hours Summary */}
            <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/15 mt-6">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  שעות טיסה מאושרות
                </CardTitle>
              </CardHeader>
              <CardContent>
                {flightHours.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">אין שעות טיסה מאושרות עדיין</p>
                ) : (
                  <div className="space-y-3">
                    {flightHours.map((hour) => (
                      <div 
                        key={hour.id}
                        className="p-4 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-green-500/20">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{hour.instructor_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(parseISO(hour.flight_date), "dd/MM/yyyy")}
                            </p>
                          </div>
                        </div>
                        <Badge variant="default" className="bg-green-600">
                          {hour.hours} שעות
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases">
            <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/15">
              <CardHeader>
                <CardTitle className="text-foreground">היסטוריית רכישות</CardTitle>
              </CardHeader>
              <CardContent>
                {purchases.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">אין רכישות עדיין</p>
                ) : (
                  <div className="space-y-3">
                    {purchases.map((purchase) => (
                      <div 
                        key={purchase.id}
                        className="p-4 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-primary/20">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{purchase.instructor_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(parseISO(purchase.purchase_date), "dd/MM/yyyy HH:mm")}
                            </p>
                            {purchase.notes && (
                              <p className="text-xs text-muted-foreground mt-1">{purchase.notes}</p>
                            )}
                          </div>
                        </div>
                        <p className="text-lg font-bold text-primary">₪{Number(purchase.amount).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reschedule Dialog */}
        <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
          <DialogContent className="bg-card border-white/15">
            <DialogHeader>
              <DialogTitle className="text-foreground">הזזת שיעור</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedLesson && (
                <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
                  <p className="text-foreground">שיעור #{selectedLesson.lesson_number} עם {selectedLesson.instructor_name}</p>
                  <p className="text-sm text-muted-foreground">
                    תאריך נוכחי: {format(parseISO(selectedLesson.lesson_date), "dd/MM/yyyy")} בשעה {selectedLesson.lesson_time}
                  </p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">בחר תאריך חדש:</p>
                <Calendar
                  mode="single"
                  selected={newDate}
                  onSelect={setNewDate}
                  locale={he}
                  className="rounded-md border border-white/10 p-3 pointer-events-auto"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">בחר שעה:</p>
                <Select value={newTime} onValueChange={setNewTime}>
                  <SelectTrigger className="bg-white/[0.05] border-white/15">
                    <SelectValue placeholder="בחר שעה" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full" 
                onClick={rescheduleLesson}
                disabled={!newDate || !newTime}
              >
                אשר הזזה
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyAccount;
