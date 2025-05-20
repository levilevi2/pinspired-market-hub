
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

// Simple mock authentication state
const isAuthenticated = false; // This would come from your auth context

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState(isAuthenticated ? "payment" : "user-details");
  
  // Form states
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckout = () => {
    // Validate user details
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
                      <p className="font-bold text-pinterest-purple">₪{item.price.toFixed(2)}</p>
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
                  <span className="font-bold text-pinterest-purple">₪{getTotalPrice().toFixed(2)}</span>
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
                className="w-full mt-6 bg-pinterest-purple hover:bg-pinterest-dark-purple flex items-center gap-2"
                onClick={handleCheckout}
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
