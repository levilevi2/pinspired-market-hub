
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RaffleEntry from "./pages/RaffleEntry";
import DiscountedFlight from "./pages/DiscountedFlight";
import InstructorDetails from "./pages/InstructorDetails";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import { CartProvider } from "./contexts/CartContext";

const queryClient = new QueryClient();

// Wrap the App component in a function to ensure hooks are used in a component context
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/raffle-entry" element={<RaffleEntry />} />
              <Route path="/discounted-flight" element={<DiscountedFlight />} />
              <Route path="/instructor-details" element={<InstructorDetails />} />
              <Route path="/cart" element={<CartPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
