
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface InstructorFormValues {
  fullName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  experience: string;
  availability: string;
  bio: string;
}

const InstructorDetails = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<InstructorFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      licenseNumber: "",
      experience: "",
      availability: "",
      bio: ""
    }
  });

  const onSubmit = (data: InstructorFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast({
        title: "הטופס נשלח בהצלחה",
        description: "נחזור אליך בהקדם האפשרי",
      });
      setIsSubmitting(false);
      form.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-900/70">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" asChild className="text-white mr-2">
            <Link to="/discounted-flight">
              <ArrowLeft className="mr-2 h-4 w-4" />
              חזרה
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-white">פרטי מדריך</h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-md shadow-xl border-pinterest-purple/20 p-6">
          <div dir="rtl">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-pinterest-purple/30 pb-2">
              טופס הרשמה למדריכים
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם מלא</FormLabel>
                        <FormControl>
                          <Input placeholder="הכנס את שמך המלא" {...field} className="bg-white/20 text-white placeholder:text-white/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>אימייל</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} className="bg-white/20 text-white placeholder:text-white/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>טלפון</FormLabel>
                        <FormControl>
                          <Input placeholder="מספר טלפון" {...field} className="bg-white/20 text-white placeholder:text-white/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>מספר רישיון</FormLabel>
                        <FormControl>
                          <Input placeholder="מספר רישיון הטיסה שלך" {...field} className="bg-white/20 text-white placeholder:text-white/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ניסיון (בשנים)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="מספר שנות ניסיון" {...field} className="bg-white/20 text-white placeholder:text-white/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>זמינות</FormLabel>
                        <FormControl>
                          <Input placeholder="ימים ושעות זמינות" {...field} className="bg-white/20 text-white placeholder:text-white/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מידע נוסף על עצמך</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="ספר לנו עוד על הניסיון שלך בהדרכה" 
                          {...field} 
                          className="bg-white/20 text-white placeholder:text-white/50 min-h-[120px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-pinterest-purple hover:bg-pinterest-dark-purple text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "שולח..." : "שליחה"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default InstructorDetails;
