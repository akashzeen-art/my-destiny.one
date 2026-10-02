import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { ReadingsProvider } from "@/contexts/ReadingsContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useEffect } from "react";
import LoadingOverlay from "./components/LoadingOverlay";
import CosmicBackground from "./components/CosmicBackground";
import ServiceGateRoute from "@/components/ServiceGateRoute";

import Index from "./pages/Index";
import PalmAnalysis from "./pages/PalmAnalysis";
import Numerology from "./pages/Numerology";
import AstrologyReading from "./pages/AstrologyReading";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import VideoBackgroundDemo from "./pages/VideoBackgroundDemo";
import KidsBoxPortal from "./pages/KidsBoxPortal";
import VideoTest from "./pages/VideoTest";
import Checkout from "./pages/Checkout";
import AdminPanel from "./pages/AdminPanel";
import MyAccount from "./pages/MyAccount";
import AboutAstrology from "./pages/AboutAstrology";
import Horoscope from "./pages/Horoscope";
import HoroscopeSign from "./pages/HoroscopeSign";
import Tarot from "./pages/Tarot";
import NumerologyNumber from "./pages/NumerologyNumber";
import ChineseHoroscope from "./pages/ChineseHoroscope";
import ChineseHoroscopeSign from "./pages/ChineseHoroscopeSign";
import AstrologyHouses from "./pages/AstrologyHouses";
import Planets from "./pages/Planets";
import PlanetDetail from "./pages/PlanetDetail";
import Downloads from "./pages/Downloads";
import DreamInterpretation from "./pages/DreamInterpretation";
import TalkToAstra from "./pages/TalkToAstra";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/** Destiny home has its own full-bleed bg — hide cosmic sky on `/`. */
function CosmicBackgroundGate() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  return <CosmicBackground />;
}

function AppRoutes() {
  return (
    <SubscriptionProvider>
      <CosmicBackgroundGate />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/horoscope" element={<ServiceGateRoute featureName="Horoscope"><Horoscope /></ServiceGateRoute>} />
        <Route path="/horoscope/:signId" element={<ServiceGateRoute featureName="Horoscope"><HoroscopeSign /></ServiceGateRoute>} />
        <Route path="/tarot" element={<ServiceGateRoute featureName="Tarot"><Tarot /></ServiceGateRoute>} />
        <Route path="/palm-analysis" element={<ServiceGateRoute featureName="Palm Analysis"><PalmAnalysis /></ServiceGateRoute>} />
        <Route path="/numerology" element={<ServiceGateRoute featureName="Numerology"><Numerology /></ServiceGateRoute>} />
        <Route path="/numerology/:numberId" element={<ServiceGateRoute featureName="Numerology"><NumerologyNumber /></ServiceGateRoute>} />
        <Route path="/chinese-horoscope" element={<ServiceGateRoute featureName="Chinese Horoscope"><ChineseHoroscope /></ServiceGateRoute>} />
        <Route path="/chinese-horoscope/:animalId" element={<ServiceGateRoute featureName="Chinese Horoscope"><ChineseHoroscopeSign /></ServiceGateRoute>} />
        <Route path="/astrology-houses" element={<ServiceGateRoute featureName="Astrology Houses"><AstrologyHouses /></ServiceGateRoute>} />
        <Route path="/planets" element={<ServiceGateRoute featureName="Planets"><Planets /></ServiceGateRoute>} />
        <Route path="/planets/:planetId" element={<ServiceGateRoute featureName="Planets"><PlanetDetail /></ServiceGateRoute>} />
        <Route path="/downloads" element={<ServiceGateRoute featureName="Downloads"><Downloads /></ServiceGateRoute>} />
        <Route path="/dreams" element={<ServiceGateRoute featureName="Dream Interpretation"><DreamInterpretation /></ServiceGateRoute>} />
        <Route path="/talk-to-astra" element={<ServiceGateRoute featureName="Talk to Astra"><TalkToAstra /></ServiceGateRoute>} />
        <Route path="/astrology" element={<ServiceGateRoute featureName="Birth Chart"><AstrologyReading /></ServiceGateRoute>} />
        <Route path="/dashboard" element={<ServiceGateRoute featureName="Dashboard"><Dashboard /></ServiceGateRoute>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/about" element={<AboutAstrology />} />
        <Route path="/video-demo" element={<VideoBackgroundDemo />} />
        <Route path="/kids-portal" element={<KidsBoxPortal />} />
        <Route path="/video-test" element={<VideoTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SubscriptionProvider>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <>
    <LoadingOverlay />
    <div className="relative z-[1]">
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <ReadingsProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </TooltipProvider>
            </ReadingsProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
    </div>
  </>
);

export default App;
