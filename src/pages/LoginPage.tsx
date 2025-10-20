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
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignupForm from "@/components/SignupForm";
import { supabase } from "@/integrations/supabase/client";

// Define the form schema with validations
const loginFormSchema = z.object({
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  password: z.string().min(8, { message: "סיסמה חייבת להכיל לפחות 8 תווים" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: "סיסמה חייבת להכיל אותיות ומספרים" }),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      const userName = values.email.split('@')[0];
      localStorage.setItem('user', JSON.stringify({ 
        name: userName,
        email: values.email,
        isLoggedIn: true
      }));
      
      toast({
        title: "כניסה בוצעה בהצלחה",
        description: `שלום ${userName}, ברוכים הבאים לאקדמיית הטיסה`,
      });
      
      navigate(-1);
    } catch (error: any) {
      toast({
        title: "שגיאה בהתחברות",
        description: error.message || "אנא נסה שוב",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function signInWithGoogle() {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "שגיאה בהתחברות עם Google",
        description: error.message || "אנא נסה שוב",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignupClick = () => {
    setShowSignupDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 relative">
      <AnimatedWorldMap />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-center text-foreground">כניסה לאקדמיית הטיסה</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">דואר אלקטרוני</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="your@email.com" 
                            type="email" 
                            className="pl-10 bg-background/50 border-border/50" 
                            {...field} 
                          />
                          <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
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
                      <FormLabel className="text-foreground">סיסמה</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="הזן סיסמה" 
                            className="pl-10 bg-background/50 border-border/50"
                            {...field} 
                          />
                          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
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

                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "מתחבר..." : "כניסה"}
                </Button>
              </form>
            </Form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">או</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={signInWithGoogle}
              disabled={isLoading}
            >
              <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              כניסה עם Google
            </Button>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                אין לך חשבון עדיין?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary font-medium" 
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
          <DialogContent className="sm:max-w-md md:max-w-lg bg-card/90 backdrop-blur-sm border-border/30">
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-foreground">הרשמה לאקדמיית הטיסה</DialogTitle>
            </DialogHeader>
            <SignupForm onClose={() => setShowSignupDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LoginPage;
