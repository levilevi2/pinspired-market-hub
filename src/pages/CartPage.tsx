import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, CreditCard, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState("authentication-check");
  
  // Form states
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  // Check authentication status
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(user.isLoggedIn);
      if (user.isLoggedIn) {
        setStep("payment");
      } else {
        setStep("registration-required");
      }
    } else {
      setIsAuthenticated(false);
      setStep("registration-required");
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterRedirect = () => {
    navigate("/login");
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "נדרשת הרשמה",
        description: "יש להירשם או להתחבר לפני ביצוע רכישה",
        variant: "destructive"
      });
      return;
    }

    // Validate user details if needed
    if (step === "user-details") {
      if (!userDetails.fullName || !userDetails.email || !userDetails.phone) {
        toast({
          title: "שגיאה",
          description: "נא למלא את כל השדות הנדרשים",
          variant: "destructive"
        });
        return;
      }
      setStep("payment");
    } else {
      // Process payment (mock)
      toast({
        title: "ההזמנה בוצעה בהצלחה",
        description: "תודה על ההזמנה! פרטי ההזמנה נשלחו לדוא״ל שלך",
      });
      clearCart();
      // Would redirect to a thank you page or order confirmation in a real app
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-blue-900/70">
        <Header />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">סל הקניות</h1>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-medium text-white mb-4">סל הקניות שלך ריק</h2>
            <p className="text-white/80 mb-6">לא הוספת עדיין מוצרים לסל הקניות</p>
            <Button asChild>
              <Link to="/">המשך בקניות</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Show registration required screen for unauthenticated users
  if (!isAuthenticated && step === "registration-required") {
    return (
      <div className="min-h-screen flex flex-col bg-blue-900/70">
        <Header />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">סל הקניות</h1>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md text-center">
              <User className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">נדרשת הרשמה לפני רכישה</h2>
              <p className="text-white/90 mb-6 text-lg">
                כדי להמשיך ברכישה, יש להירשם למערכת תחילה
              </p>
              
              <div className="bg-green-100/20 p-4 rounded-md mb-6">
                <h3 className="text-white font-bold mb-2">יתרונות ההרשמה:</h3>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• השתתפות אוטומטית בהגרלה הקרובה</li>
                  <li>• מעקב אחר הזמנות והיסטוריית רכישות</li>
                  <li>• קבלת עדכונים על מבצעים והטבות</li>
                  <li>• גישה מהירה לשעות טיסה ותיאומים</li>
                </ul>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleRegisterRedirect}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  עבור להרשמה
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full text-white border-white/30 hover:bg-white/10"
                  asChild
                >
                  <Link to="/">המשך בקניות</Link>
                </Button>
              </div>
            </div>

            {/* Show cart items but disabled */}
            <div className="mt-8 bg-white/5 backdrop-blur-md p-6 rounded-lg shadow-md opacity-60">
              <h3 className="text-lg font-semibold text-white mb-4">המוצרים שלך (נדרשת הרשמה):</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-grow" dir="rtl">
                      <h4 className="font-medium text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-white/70">{item.category}</p>
                      <p className="font-bold text-black text-sm">₪{item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between text-white font-bold">
                  <span>סה״כ לתשלום:</span>
                  <span className="text-black">₪{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-900/70">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">סל הקניות</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-white mb-4">המוצרים שלך</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 bg-white/5 p-4 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    
                    <div className="flex-grow" dir="rtl">
                      <h3 className="font-medium text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-white/70 mb-2">{item.category}</p>
                      <p className="font-bold text-black">₪{item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center border border-white/20 rounded-md bg-white/5">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-white hover:text-white hover:bg-white/10 px-2"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="px-4 text-white">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-white hover:text-white hover:bg-white/10 px-2"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.category === "discounted-flight" && item.quantity >= 2}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button 
                  variant="outline" 
                  className="text-white border-white/30 hover:bg-white/10"
                  asChild
                >
                  <Link to="/">המשך בקניות</Link>
                </Button>
                
                <Button 
                  variant="destructive"
                  onClick={clearCart}
                >
                  רוקן סל
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary and Checkout */}
          <div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-xl font-semibold text-white mb-4" dir="rtl">סיכום הזמנה</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white" dir="rtl">
                  <span>סה״כ מוצרים:</span>
                  <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-white" dir="rtl">
                  <span>סה״כ לתשלום:</span>
                  <span className="font-bold text-black">₪{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4 bg-white/20" />
              
              {step === "user-details" ? (
                <div className="space-y-3" dir="rtl">
                  <h3 className="font-medium text-white">פרטי משתמש</h3>
                  
                  <div>
                    <label htmlFor="fullName" className="block text-sm text-white/90 mb-1">שם מלא *</label>
                    <Input 
                      id="fullName" 
                      name="fullName"
                      value={userDetails.fullName}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm text-white/90 mb-1">דוא״ל *</label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={userDetails.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm text-white/90 mb-1">טלפון *</label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={userDetails.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm text-white/90 mb-1">כתובת</label>
                    <Textarea 
                      id="address" 
                      name="address"
                      value={userDetails.address}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3" dir="rtl">
                  <h3 className="font-medium text-white">פרטי תשלום</h3>
                  
                  {/* Mock payment form fields */}
                  <div>
                    <label htmlFor="cardName" className="block text-sm text-white/90 mb-1">שם בעל הכרטיס *</label>
                    <Input 
                      id="cardName" 
                      className="bg-white/10 border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm text-white/90 mb-1">מספר כרטיס *</label>
                    <Input 
                      id="cardNumber" 
                      className="bg-white/10 border-white/20 text-white"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="expiry" className="block text-sm text-white/90 mb-1">תוקף *</label>
                      <Input 
                        id="expiry" 
                        placeholder="MM/YY"
                        className="bg-white/10 border-white/20 text-white"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm text-white/90 mb-1">CVV *</label>
                      <Input 
                        id="cvv" 
                        className="bg-white/10 border-white/20 text-white"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full mt-6 bg-black hover:bg-gray-800 text-white flex items-center gap-2"
                onClick={handleCheckout}
                disabled={!isAuthenticated}
              >
                {step === "payment" && <CreditCard size={18} />}
                {step === "user-details" ? "המשך לתשלום" : "בצע תשלום"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
