
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ScheduleSlot {
  id: string;
  time: string;
  available: boolean;
}

interface InstructorScheduleProps {
  instructorId: string;
  instructorName: string;
  onScheduleConfirmed: (date: Date | undefined, timeSlot: string) => void;
  onCancel: () => void;
}

const InstructorSchedule: React.FC<InstructorScheduleProps> = ({
  instructorId,
  instructorName,
  onScheduleConfirmed,
  onCancel
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<ScheduleSlot[]>([
    { id: "1", time: "09:00", available: true },
    { id: "2", time: "10:00", available: true },
    { id: "3", time: "11:00", available: false },
    { id: "4", time: "12:00", available: true },
    { id: "5", time: "13:00", available: false },
    { id: "6", time: "14:00", available: true },
    { id: "7", time: "15:00", available: true },
    { id: "8", time: "16:00", available: true },
    { id: "9", time: "17:00", available: false }
  ]);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    // In a real app, you would fetch available time slots for this date
    // For now, we'll just simulate this with random availability
    const updatedSlots = timeSlots.map(slot => ({
      ...slot,
      available: Math.random() > 0.3
    }));
    setTimeSlots(updatedSlots);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slotTime: string) => {
    setSelectedTimeSlot(slotTime);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTimeSlot) {
      onScheduleConfirmed(selectedDate, selectedTimeSlot);
      toast({
        title: "זמן נבחר",
        description: `התור נקבע ל${selectedTimeSlot} בתאריך ${selectedDate.toLocaleDateString('he-IL')}`,
      });
    } else {
      toast({
        title: "אנא בחר תאריך ושעה",
        variant: "destructive",
      });
    }
  };

  const handleAddToCartAndCheckout = () => {
    if (selectedDate && selectedTimeSlot) {
      onScheduleConfirmed(selectedDate, selectedTimeSlot);
      toast({
        title: "נוסף לסל",
        description: `שעת טיסה נוספה לסל הקניות שלך`,
      });
      navigate("/cart");
    } else {
      toast({
        title: "אנא בחר תאריך ושעה",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader dir="rtl">
        <h2 className="text-xl font-bold">לוח זמנים - {instructorName}</h2>
        <p className="text-sm text-gray-500">בחר תאריך ושעה לטיסה שלך</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              className="border rounded-md pointer-events-auto"
              disabled={{ before: new Date() }}
            />
          </div>
          
          <div dir="rtl">
            <h3 className="font-medium mb-3">שעות זמינות:</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(slot => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                  disabled={!slot.available}
                  className={`${
                    selectedTimeSlot === slot.time ? "bg-pinterest-purple hover:bg-pinterest-dark-purple" : ""
                  }`}
                  onClick={() => handleTimeSlotSelect(slot.time)}
                >
                  {slot.time}
                  {selectedTimeSlot === slot.time && <Check className="ml-1" size={14} />}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-3" dir="rtl">
        <Button variant="outline" onClick={onCancel}>ביטול</Button>
        <Button 
          onClick={handleConfirm}
          className="bg-pinterest-purple hover:bg-pinterest-dark-purple"
          disabled={!selectedDate || !selectedTimeSlot}
        >
          אישור
        </Button>
        <Button 
          onClick={handleAddToCartAndCheckout}
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={!selectedDate || !selectedTimeSlot}
        >
          הוסף לסל ועבור לקופה
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InstructorSchedule;
