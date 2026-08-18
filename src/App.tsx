import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileCTABar from "@/components/MobileCTABar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import PageTransition from "@/components/PageTransition";
import TrustBar from "@/components/TrustBar";
import ExitIntentModal from "@/components/ExitIntentModal";
import LegacyRedirect from "@/components/LegacyRedirect";
import SiteSearch from "@/components/SiteSearch";
import { SiteSearchProvider, useSiteSearch } from "@/hooks/use-site-search";

import Index from "./pages/Index";
import About from "./pages/About";
import PracticeAreas from "./pages/PracticeAreas";
import PracticeAreaDetail from "./pages/PracticeAreaDetail";
import Results from "./pages/Results";
import Insights from "./pages/Insights";
import BlogPost from "./pages/BlogPost";
import LegalTools from "./pages/LegalTools";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/practice-areas" element={<PageTransition><PracticeAreas /></PageTransition>} />
        <Route path="/practice-areas/:areaId" element={<PageTransition><PracticeAreaDetail /></PageTransition>} />
        <Route path="/results" element={<PageTransition><Results /></PageTransition>} />
        <Route path="/insights" element={<PageTransition><Insights /></PageTransition>} />
        <Route path="/insights/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/legal-tools" element={<PageTransition><LegalTools /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const SearchLayer = () => {
  const { open, setOpen } = useSiteSearch();
  return <SiteSearch open={open} onOpenChange={setOpen} />;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SiteSearchProvider>
            <ScrollProgressBar />
            <Header />
            <ScrollToTop />
            <main className="min-h-screen pb-14 lg:pb-0">
              <LegacyRedirect>
                <AnimatedRoutes />
              </LegacyRedirect>
            </main>
            <TrustBar />
            <Footer />
            <WhatsAppButton />
            <MobileCTABar />
            <ExitIntentModal />
            <SearchLayer />
          </SiteSearchProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

