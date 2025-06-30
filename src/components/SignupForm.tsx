import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Info, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Define the form schema with validations for regular users
const userFormSchema = z.object({
  firstName: z.string().min(2, { message: "שם פרטי חייב להכיל לפחות 2 תווים" }),
  lastName: z.string().min(2, { message: "שם משפחה חייב להכיל לפחות 2 תווים" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  phone: z.string().min(10, { message: "מספר טלפון חייב להכיל לפחות 10 ספרות" }),
  idNumber: z.string().min(9, { message: "תעודת זהות חייבת להכיל 9 ספרות" }),
  password: z.string().min(8, { message: "סיסמה חייבת להכיל לפחות 6 תווים" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: "סיסמה חייבת להכיל אותיות ומספרים" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "הסיסמאות אינן תואמות",
  path: ["confirmPassword"],
});

// Define the form schema for instructors
const instructorFormSchema = z.object({
  firstName: z.string().min(2, { message: "שם פרטי חייב להכיל לפחות 2 תווים" }),
  lastName: z.string().min(2, { message: "שם משפחה חייב להכיל לפחות 2 תווים" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  phone: z.string().min(10, { message: "מספר טלפון חייב להכיל לפחות 10 ספרות" }),
  idNumber: z.string().min(9, { message: "תעודת זהות חייבת להכיל 9 ספרות" }),
  password: z.string().min(8, { message: "סיסמה חייבת להכיל לפחות 6 תווים" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { message: "סיסמה חייבת להכיל אותיות ומספרים" }),
  confirmPassword: z.string(),
  licenseNumber: z.string().min(5, { message: "מספר רשיון טיס חייב להכיל לפחות 5 תווים" }),
  experience: z.string().min(1, { message: "שנות ניסיון נדרשות" }),
  hourlyRate: z.string().min(1, { message: "תעריף שעתי נדרש" }),
  aircraftType: z.string().min(1, { message: "סוג מטוס נדרש" }),
  studyLocation: z.string().min(1, { message: "מיקום לימוד נדרש" }),
  flightSettings: z.array(z.string()).min(1, { message: "יש לבחור לפחות הגדרה אחת" }),
  description: z.string().min(10, { message: "תיאור חייב להכיל לפחות 10 תווים" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "הסיסמאות אינן תואמות",
  path: ["confirmPassword"],
});

interface SignupFormProps {
  onClose: () => void;
  defaultTab?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose, defaultTab = "student" }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [pilotLicense, setPilotLicense] = useState<File | null>(null);
  const [idPhoto, setIdPhoto] = useState<File | null>(null);
  const [instructorPhoto, setInstructorPhoto] = useState<File | null>(null);
  const [selectedSettings, setSelectedSettings] = useState<string[]>([]);
  
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      idNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const instructorForm = useForm<z.infer<typeof instructorFormSchema>>({
    resolver: zodResolver(instructorFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      idNumber: "",
      password: "",
      confirmPassword: "",
      licenseNumber: "",
      experience: "",
      hourlyRate: "",
      aircraftType: "",
      studyLocation: "",
      flightSettings: [],
      description: "",
    },
  });

  const flightSettingsOptions = [
    "טיסות יום",
    "טיסות לילה", 
    "טיסות פנורמיות",
    "טיסת מכשירים",
    "אווירובטיקה",
    "צילום אווירי",
    "טיסות צולבות",
    "הדרכה תיאורטית"
  ];

  function onUserSubmit(values: z.infer<typeof userFormSchema>) {
    console.log("User form submitted with values:", values);
    
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify({
      name: values.firstName,
      email: values.email,
      isLoggedIn: true,
      type: 'student'
    }));
    
    toast({
      title: "הרשמה בוצעה בהצלחה",
      description: "ברוכים הבאים לאקדמיית הטיסה",
    });
    
    onClose();
    
    // If we're on the login page, navigate back
    if (window.location.pathname === "/login") {
      navigate(-1);
    }
  }

  function onInstructorSubmit(values: z.infer<typeof instructorFormSchema>) {
    console.log("Instructor form submitted with values:", values);
    console.log("Pilot license file:", pilotLicense);
    console.log("ID photo file:", idPhoto);
    console.log("Instructor photo file:", instructorPhoto);
    
    if (!pilotLicense || !idPhoto || !instructorPhoto) {
      toast({
        title: "חסרים קבצים",
        description: "יש להעלות צילום רשיון טיס, צילום תעודת זהות ותמונה אישית",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "בקשת הרשמה נשלחה",
      description: "הבקשה שלך נשלחה לבדיקה. תקבל הודעה לאחר אישור המנהל",
    });
    
    onClose();
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'license' | 'id' | 'photo') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'license') {
        setPilotLicense(file);
      } else if (type === 'id') {
        setIdPhoto(file);
      } else {
        setInstructorPhoto(file);
      }
    }
  };

  const handleSettingChange = (setting: string, checked: boolean) => {
    const newSettings = checked 
      ? [...selectedSettings, setting]
      : selectedSettings.filter(s => s !== setting);
    
    setSelectedSettings(newSettings);
    instructorForm.setValue('flightSettings', newSettings);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">הרשמה רגילה</TabsTrigger>
          <TabsTrigger value="instructor">הרשמת מדריך טיסה</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student">
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4 mt-2 rtl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={userForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם פרטי</FormLabel>
                      <FormControl>
                        <Input placeholder="שם פרטי" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם משפחה</FormLabel>
                      <FormControl>
                        <Input placeholder="שם משפחה" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>דואר אלקטרוני</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>מספר טלפון</FormLabel>
                    <FormControl>
                      <Input placeholder="מספר טלפון" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>תעודת זהות</FormLabel>
                    <FormControl>
                      <Input placeholder="תעודת זהות" {...field} />
                    </FormControl>
                    <div className="flex items-start mt-1">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 ml-1" />
                      <p className="text-xs text-gray-500">הצורך בת.ז. למניעת הרשמה כפולה</p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>סיסמה</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="סיסמה" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>אימות סיסמה</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="אימות סיסמה" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="my-4" />
              
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <p className="text-sm text-blue-800 text-center">יש לרכוש מוצר אחד לפחות כדי להיכנס להגרלה</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" type="button" onClick={onClose} className="ml-2">ביטול</Button>
                <Button type="submit">הרשמה</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="instructor">
          <div className="max-h-[70vh] overflow-y-auto px-2">
            <Form {...instructorForm}>
              <form onSubmit={instructorForm.handleSubmit(onInstructorSubmit)} className="space-y-4 mt-2 rtl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={instructorForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם פרטי</FormLabel>
                        <FormControl>
                          <Input placeholder="שם פרטי" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={instructorForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם משפחה</FormLabel>
                        <FormControl>
                          <Input placeholder="שם משפחה" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={instructorForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>דואר אלקטרוני</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={instructorForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מספר טלפון</FormLabel>
                      <FormControl>
                        <Input placeholder="מספר טלפון" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={instructorForm.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תעודת זהות</FormLabel>
                      <FormControl>
                        <Input placeholder="תעודת זהות" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={instructorForm.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>מספר רשיון טיס</FormLabel>
                        <FormControl>
                          <Input placeholder="מספר רשיון" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={instructorForm.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שנות ניסיון</FormLabel>
                        <FormControl>
                          <Input placeholder="מספר שנים" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={instructorForm.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>תעריף לשעה (₪)</FormLabel>
                        <FormControl>
                          <Input placeholder="תעריף שעתי" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={instructorForm.control}
                    name="aircraftType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>סוג מטוס ההדרכה</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="בחר סוג מטוס" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cessna-172">Cessna 172</SelectItem>
                            <SelectItem value="piper-cherokee">Piper Cherokee</SelectItem>
                            <SelectItem value="diamond-da40">Diamond DA40</SelectItem>
                            <SelectItem value="cessna-150">Cessna 150</SelectItem>
                            <SelectItem value="piper-seneca">Piper Seneca</SelectItem>
                            <SelectItem value="beechcraft-baron">Beechcraft Baron</SelectItem>
                            <SelectItem value="extra-300">Extra 300</SelectItem>
                            <SelectItem value="simulator">סימולטור</SelectItem>
                            <SelectItem value="other">אחר</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={instructorForm.control}
                  name="studyLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מיקום הלימוד</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר מיקום לימוד" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="herzliya">שדה התעופה הרצליה</SelectItem>
                          <SelectItem value="ben-gurion">שדה התעופה בן גוריון</SelectItem>
                          <SelectItem value="haifa">שדה התעופה חיפה</SelectItem>
                          <SelectItem value="kiryat-shmona">שדה התעופה קרית שמונה</SelectItem>
                          <SelectItem value="tel-aviv-center">מרכז ההדרכה תל אביב</SelectItem>
                          <SelectItem value="simulation-center">מרכז סימולציה</SelectItem>
                          <SelectItem value="mobile">נייד - לפי בקשה</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={instructorForm.control}
                  name="flightSettings"
                  render={() => (
                    <FormItem>
                      <FormLabel>סוגי הגדרים/שירותים שאתה מספק</FormLabel>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {flightSettingsOptions.map((setting) => (
                          <div key={setting} className="flex items-center space-x-2">
                            <Checkbox
                              id={setting}
                              checked={selectedSettings.includes(setting)}
                              onCheckedChange={(checked) => handleSettingChange(setting, checked as boolean)}
                            />
                            <label
                              htmlFor={setting}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {setting}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={instructorForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תיאור מדריך</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="תאר את הניסיון שלך, התמחויות, סגנון הוראה ומה שחשוב למועמדים לדעת עליך כמדריך טיסה"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={instructorForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סיסמה</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="סיסמה" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={instructorForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אימות סיסמה</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="אימות סיסמה" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">העלאת מסמכים ותמונות</h3>
                  
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">תמונה אישית</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'photo')}
                            className="hidden"
                            id="instructor-photo"
                          />
                          <label
                            htmlFor="instructor-photo"
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            העלה תמונה
                          </label>
                          {instructorPhoto && (
                            <span className="text-sm text-green-600">{instructorPhoto.name}</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">צילום רשיון טיס</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, 'license')}
                            className="hidden"
                            id="pilot-license"
                          />
                          <label
                            htmlFor="pilot-license"
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            העלה קובץ
                          </label>
                          {pilotLicense && (
                            <span className="text-sm text-green-600">{pilotLicense.name}</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">צילום תעודת זהות</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, 'id')}
                            className="hidden"
                            id="id-photo"
                          />
                          <label
                            htmlFor="id-photo"
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            העלה קובץ
                          </label>
                          {idPhoto && (
                            <span className="text-sm text-green-600">{idPhoto.name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                  <p className="text-sm text-yellow-800 text-center">
                    הבקשה תישלח לבדיקה ואישור המנהל. תקבל הודעה לאחר עיבוד הבקשה.
                  </p>
                </div>

                <div className="flex justify-end space-x-2 pt-2 sticky bottom-0 bg-white pb-2">
                  <Button variant="outline" type="button" onClick={onClose} className="ml-2">ביטול</Button>
                  <Button type="submit">שלח לאישור</Button>
                </div>
              </form>
            </Form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignupForm;
