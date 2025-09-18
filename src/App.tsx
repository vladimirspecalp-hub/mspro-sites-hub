import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MSPROAbout from "./pages/MSPROAbout";
import MSPROServices from "./pages/MSPROServices";
import NotFound from "./pages/NotFound";
// Legacy MSPRO Pages
import HomePage from "./pages/MSPROHome";
import ServicesPage from "./pages/MSPROServices";
import ServiceDetailPage from "./pages/MSPROServiceDetail";
import ContactsPage from "./pages/MSPROContacts";
import About from "./pages/About";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<MSPROAbout />} />
          <Route path="/services" element={<MSPROServices />} />
          <Route path="/about" element={<About />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:slug" element={<CaseDetail />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/demo" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
