
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, Plane, User, MapPin } from "lucide-react";
import InstructorSchedule from "./InstructorSchedule";

export interface Instructor {
  id: string;
  name: string;
  experience: number;
  hourlyRate: number;
  rating: number;
  totalFlights: number;
  specialties: string[];
  aircraftTypes: string[];
  location: string;
  description: string;
  image: string;
  flightSettings: {
    maxAltitude: string;
    flightZone: string;
    aircraftModel: string;
    safetyLevel: string;
  };
}

interface InstructorCardProps {
  instructor: Instructor;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [scheduledTime, setScheduledTime] = useState<string | undefined>();

  const handleScheduleConfirmed = (date: Date | undefined, timeSlot: string) => {
    setScheduledDate(date);
    setScheduledTime(timeSlot);
    setShowSchedule(false);
  };

  const cancelScheduling = () => {
    setShowSchedule(false);
  };

  if (showSchedule) {
    return (
      <InstructorSchedule 
        instructorId={instructor.id}
        instructorName={instructor.name}
        onScheduleConfirmed={handleScheduleConfirmed}
        onCancel={cancelScheduling}
      />
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-white/40 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-xl">{instructor.name}</CardTitle>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white/80 ml-1">{instructor.rating}/5</span>
                <span className="text-white/60 text-sm mr-2">({instructor.totalFlights} טיסות)</span>
              </div>
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-white">₪{instructor.hourlyRate}</div>
            <div className="text-white/60 text-sm">לשעה</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-white/80">
            <Clock className="w-4 h-4 mr-2" />
            {instructor.experience} שנות ניסיון
          </div>
          <div className="flex items-center text-white/80">
            <MapPin className="w-4 h-4 mr-2" />
            {instructor.location}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">התמחויות:</h4>
          <div className="flex flex-wrap gap-2">
            {instructor.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-600/50 text-white">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">הגדרות טיסה מומלצות:</h4>
          <div className="bg-black/20 rounded-lg p-3 space-y-2 text-sm text-white/90">
            <div className="flex justify-between">
              <span>גובה מקסימלי:</span>
              <span>{instructor.flightSettings.maxAltitude}</span>
            </div>
            <div className="flex justify-between">
              <span>אזור טיסה:</span>
              <span>{instructor.flightSettings.flightZone}</span>
            </div>
            <div className="flex justify-between">
              <span>דגם מטוס:</span>
              <span>{instructor.flightSettings.aircraftModel}</span>
            </div>
            <div className="flex justify-between">
              <span>רמת בטיחות:</span>
              <span>{instructor.flightSettings.safetyLevel}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">סוגי מטוסים:</h4>
          <div className="flex flex-wrap gap-2">
            {instructor.aircraftTypes.map((aircraft, index) => (
              <div key={index} className="flex items-center bg-black/20 rounded px-2 py-1 text-sm text-white/80">
                <Plane className="w-3 h-3 mr-1" />
                {aircraft}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-3">
          <p className="text-white/90 text-sm">{instructor.description}</p>
        </div>

        {scheduledDate && scheduledTime && (
          <div className="bg-green-100/20 rounded-lg p-3 border border-green-500/30">
            <p className="text-white text-sm">
              נקבע מועד: {scheduledDate.toLocaleDateString('he-IL')} בשעה {scheduledTime}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={() => setShowSchedule(true)}
            className="flex-1 bg-black hover:bg-gray-800 text-white"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {scheduledDate && scheduledTime ? "שנה מועד" : "קבע מועד"}
          </Button>
          {scheduledDate && scheduledTime && (
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              הוסף לסל
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCard;
