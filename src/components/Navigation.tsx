import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Flower2, Heart, Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/garden', label: 'Our Garden', icon: Flower2 },
  { path: '/favorites', label: "Harshita's Favorites", icon: Heart },
  { path: '/games', label: 'Game Zone', icon: Gamepad2 },
];

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-40 backdrop-blur-lg"
    >
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between rounded-full border border-border/50 bg-card/80 px-6 py-3">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <Flower2 className="h-6 w-6 text-tulip-pink tulip-icon" />
            <span className="font-display text-lg font-semibold text-gold">
              Harshita's Day
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="relative"
                >
                  <motion.div
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full bg-primary/20 border border-primary/30"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="relative z-10 h-4 w-4" />
                    <span className="relative z-10">{item.label}</span>
                  </motion.div>
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full p-2 hover:bg-secondary md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 rounded-2xl border border-border/50 bg-card/95 p-4 md:hidden"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/20 text-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
