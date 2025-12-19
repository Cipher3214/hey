import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import OurGarden from "./pages/OurGarden";
import HarshitaFavorites from "./pages/HarshitaFavorites";
import GameZone from "./pages/GameZone";
import NotFound from "./pages/NotFound";
import FloatingParticles from "./components/FloatingParticles";
import Navigation from "./components/Navigation";
import MusicPlayer from "./components/MusicPlayer";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === '/';

  return (
    <>
      {!isIndexPage && (
        <>
          <FloatingParticles />
          <Navigation />
          <MusicPlayer />
        </>
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/garden" element={<OurGarden />} />
          <Route path="/favorites" element={<HarshitaFavorites />} />
          <Route path="/games" element={<GameZone />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
