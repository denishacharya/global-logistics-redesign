import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Ship, Truck, Package } from "lucide-react";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-[hsl(var(--hero-gradient-end))]"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                  }}
                  animate={{
                    y: [null, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 px-4">
            {/* Logo and Company Name */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                Team Global
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light tracking-[0.3em]">
                LOGISTICS
              </p>
            </motion.div>

            {/* Animated Icons */}
            <div className="relative w-64 h-32">
              {/* Plane */}
              <motion.div
                className="absolute"
                initial={{ x: -100, y: 20 }}
                animate={{ 
                  x: 250,
                  y: [20, 10, 20],
                }}
                transition={{
                  x: { duration: 3, repeat: Infinity, ease: "linear" },
                  y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Plane className="w-8 h-8 text-accent" />
              </motion.div>

              {/* Ship */}
              <motion.div
                className="absolute"
                initial={{ x: 300, y: 60 }}
                animate={{ 
                  x: -100,
                  y: [60, 55, 60],
                }}
                transition={{
                  x: { duration: 4, repeat: Infinity, ease: "linear" },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Ship className="w-8 h-8 text-white/80" />
              </motion.div>

              {/* Truck */}
              <motion.div
                className="absolute"
                initial={{ x: -80, y: 100 }}
                animate={{ 
                  x: 280,
                  y: [100, 98, 100],
                }}
                transition={{
                  x: { duration: 2.5, repeat: Infinity, ease: "linear" },
                  y: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Truck className="w-8 h-8 text-white/70" />
              </motion.div>

              {/* Package */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Package className="w-12 h-12 text-accent" />
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 md:w-80">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm font-medium">
                  Loading
                </span>
                <span className="text-white font-bold text-sm">
                  {progress}%
                </span>
              </div>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 text-sm tracking-wider text-center"
            >
              Delivering Excellence Worldwide
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
