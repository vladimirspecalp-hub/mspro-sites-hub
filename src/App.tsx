import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Eager load homepage for instant initial render
import Index from "./pages/Index";

// Lazy load other routes to reduce initial bundle size
const MSPROAbout = lazy(() => import("./pages/MSPROAbout"));
const MSPROServices = lazy(() => import("./pages/MSPROServices"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HomePage = lazy(() => import("./pages/MSPROHome"));
const ServicesPage = lazy(() => import("./pages/MSPROServices"));
const ServiceDetailPage = lazy(() => import("./pages/MSPROServiceDetail"));
const ContactsPage = lazy(() => import("./pages/MSPROContacts"));
const About = lazy(() => import("./pages/About"));
const Cases = lazy(() => import("./pages/Cases"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
