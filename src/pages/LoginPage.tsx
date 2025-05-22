
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import SiteMap from "@/components/SiteMap";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignupForm from "@/components/SignupForm";

// Define the form schema with validations
const loginFormSchema = z.object({
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  password: z.string().min(8, { message: "סיסמה חייבת להכיל לפחות 8 תווים" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: "סיסמה חייבת להכיל אותיות ומספרים" }),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log("Login form submitted with values:", values);
    
    // Simulate login - in a real app, this would call an API
    // Extract name from email (before the @)
    const userName = values.email.split('@')[0];
    
    // Save user info to localStorage
    localStorage.setItem('user', JSON.stringify({ 
      name: userName,
      email: values.email,
      isLoggedIn: true
    }));
    
    toast({
      title: "כניסה בוצעה בהצלחה",
      description: `שלום ${userName}, ברוכים הבאים לאקדמיית הטיסה`,
    });
    
    // Navigate back to the previous page or to home if no history
    navigate(-1);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignupClick = () => {
    setShowSignupDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-900/70">
      <Header />
      
      <main className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">כניסה לאקדמיית הטיסה</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>דואר אלקטרוני</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="your@email.com" 
                          type="email" 
                          className="pl-10" 
                          {...field} 
                        />
                        <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>סיסמה</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="הזן סיסמה" 
                          className="pl-10"
                          {...field} 
                        />
                        <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-1 top-1.5 p-1 h-7"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6">
                כניסה
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              אין לך חשבון עדיין?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-pinterest-purple font-medium" 
                onClick={handleSignupClick}
              >
                הרשם עכשיו
              </Button>
            </p>
          </div>
        </div>
      </main>
      
      <SiteMap />

      {/* Signup Dialog */}
      <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">הרשמה לאקדמיית הטיסה</DialogTitle>
          </DialogHeader>
          <SignupForm onClose={() => setShowSignupDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginPage;
