import { useEffect, useRef, useState, useMemo, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Plane, Ship, Truck } from 'lucide-react';
import locationsData from '@/data/globe-locations.json';
import routesData from '@/data/globe-routes.json';

// Lazy load the Globe component for better performance
const Globe = lazy(() => import('react-globe.gl'));

// Type definitions
interface Location {
  name: string;
  lat: number;
  lng: number;
  country: string;
  region: string;
  services: string[];
  isHub?: boolean;
}

interface Route {
  from: string;
  to: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  type: 'air' | 'ocean' | 'road';
  transitTime: string;
}

// Color configuration
const ROUTE_COLORS = {
  air: ['rgba(255, 100, 100, 0.9)', 'rgba(255, 150, 150, 0.4)'],
  ocean: ['rgba(100, 180, 255, 0.9)', 'rgba(150, 200, 255, 0.4)'],
  road: ['rgba(100, 255, 150, 0.9)', 'rgba(150, 255, 180, 0.4)'],
};

const SERVICE_ICONS = {
  air: Plane,
  ocean: Ship,
  road: Truck,
};

// Globe Loading Component
const GlobeLoader = () => (
  <div className="flex flex-col items-center justify-center h-[400px] md:h-[500px]">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-pulse" />
      <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-primary rounded-full animate-spin" />
    </div>
    <p className="mt-4 text-gray-400 text-sm animate-pulse">Loading your logistics globe...</p>
  </div>
);

// City Modal Component
const CityModal = ({ 
  city, 
  onClose 
}: { 
  city: Location | null; 
  onClose: () => void;
}) => {
  if (!city) return null;

  const cityRoutes = routesData.routes.filter(
    (r: Route) => r.from === city.name || r.to === city.name
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{city.name}</h3>
            <p className="text-gray-400 text-sm">{city.country} • {city.region}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Available Services</p>
          <div className="flex gap-2">
            {city.services.map((service) => {
              const Icon = SERVICE_ICONS[service as keyof typeof SERVICE_ICONS];
              return (
                <div
                  key={service}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    service === 'air' ? 'bg-red-500/20 text-red-400' :
                    service === 'ocean' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </div>
              );
            })}
          </div>
        </div>

        {cityRoutes.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Active Routes</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cityRoutes.slice(0, 5).map((route: Route, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-sm bg-gray-800/50 px-3 py-2 rounded-lg">
                  <span className="text-gray-300">{route.from} → {route.to}</span>
                  <span className={`text-xs ${
                    route.type === 'air' ? 'text-red-400' :
                    route.type === 'ocean' ? 'text-blue-400' : 'text-green-400'
                  }`}>
                    {route.transitTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {city.isHub && (
          <div className="mt-4 px-3 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <p className="text-orange-400 text-xs font-medium">⭐ Regional Hub Location</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const LogisticsGlobe = () => {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 500 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);

  // Intersection observer for lazy loading
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px',
  });

  // Combine refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const width = Math.min(containerWidth, isMobile ? 350 : 700);
        const height = isMobile ? Math.min(width, 350) : Math.min(width * 0.85, 550);
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isMobile]);

  // Globe controls and rotation
  useEffect(() => {
    if (globeEl.current && globeReady) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = isHovered ? 1.2 : 0.4;
      controls.enableZoom = !isMobile;
      controls.enablePan = false;
      controls.minDistance = 200;
      controls.maxDistance = 500;
      globeEl.current.pointOfView({ lat: 25, lng: 80, altitude: isMobile ? 3 : 2.2 });
    }
  }, [isHovered, isMobile, globeReady]);

  // Prepare points data with optimized geometry
  const pointsData = useMemo(() => 
    locationsData.locations.map((loc: Location) => ({
      ...loc,
      size: loc.isHub ? (isMobile ? 0.12 : 0.15) : (isMobile ? 0.06 : 0.08),
      color: loc.isHub ? '#FFA500' : '#00D4FF',
    })), 
  [isMobile]);

  // Prepare arcs data - simplified on mobile
  const arcsData = useMemo(() => {
    const routes = routesData.routes as Route[];
    // On mobile, show fewer arcs for performance
    const filteredRoutes = isMobile ? routes.filter((_, i) => i % 2 === 0) : routes;
    
    return filteredRoutes.map((route) => ({
      ...route,
      color: ROUTE_COLORS[route.type],
      label: `${route.from} → ${route.to}`,
    }));
  }, [isMobile]);

  // Handle point click
  const handlePointClick = useCallback((point: any) => {
    const city = locationsData.locations.find(
      (loc: Location) => loc.name === point.name
    );
    if (city) {
      setSelectedCity(city as Location);
    }
  }, []);

  // Generate tooltip HTML
  const getPointLabel = useCallback((d: any) => {
    const serviceLabels = d.services?.map((s: string) => {
      const colors = { air: '#FF6464', ocean: '#64B4FF', road: '#64FF96' };
      return `<span style="color: ${colors[s as keyof typeof colors]}">${s.charAt(0).toUpperCase() + s.slice(1)}</span>`;
    }).join(' • ') || '';

    return `
      <div style="
        background: rgba(0,0,0,0.9); 
        padding: 12px 16px; 
        border-radius: 8px; 
        color: white; 
        font-size: 13px;
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      ">
        <strong style="font-size: 14px;">${d.name}</strong>
        <div style="color: #9CA3AF; font-size: 11px; margin-top: 2px;">${d.country}</div>
        ${serviceLabels ? `<div style="margin-top: 8px; font-size: 11px;">${serviceLabels}</div>` : ''}
        <div style="margin-top: 6px; font-size: 10px; color: #6B7280;">Click for details</div>
      </div>
    `;
  }, []);

  const getArcLabel = useCallback((d: any) => {
    const typeColors = { air: '#FF6464', ocean: '#64B4FF', road: '#64FF96' };
    const typeNames = { air: 'Air Freight', ocean: 'Ocean Freight', road: 'Road Transport' };
    
    return `
      <div style="
        background: rgba(0,0,0,0.9); 
        padding: 10px 14px; 
        border-radius: 6px; 
        color: white; 
        font-size: 12px;
        border: 1px solid rgba(255,255,255,0.1);
      ">
        <div style="font-weight: 600;">${d.from} → ${d.to}</div>
        <div style="color: ${typeColors[d.type as keyof typeof typeColors]}; font-size: 11px; margin-top: 4px;">
          ${typeNames[d.type as keyof typeof typeNames]} • ${d.transitTime}
        </div>
      </div>
    `;
  }, []);

  return (
    <section 
      id="services-globe" 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #0a1628 50%, #000000 100%)' }}
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-orange-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Poppins'] text-white">
            Countries We Serve Worldwide
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Air, Ocean & Road Freight Connections Across 50+ Countries
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8"
        >
          {[
            { type: 'Air Freight', color: 'bg-red-500', icon: Plane },
            { type: 'Ocean Freight', color: 'bg-blue-500', icon: Ship },
            { type: 'Road Transport', color: 'bg-green-500', icon: Truck },
          ].map(({ type, color, icon: Icon }) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${color} shadow-lg`} />
              <Icon className="w-4 h-4 text-gray-400 hidden md:block" />
              <span className="text-xs md:text-sm text-gray-300">{type}</span>
            </div>
          ))}
        </motion.div>

        {/* Globe Container */}
        <motion.div
          ref={setRefs}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          id="globe-container"
          className="flex justify-center items-center mx-auto relative"
          style={{ maxWidth: '750px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Globe glow effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(29, 58, 138, 0.15) 0%, transparent 60%)',
            }}
          />

          {inView ? (
            <Suspense fallback={<GlobeLoader />}>
              <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                atmosphereColor="#1D3A8A"
                atmosphereAltitude={0.2}
                showAtmosphere={true}
                onGlobeReady={() => setGlobeReady(true)}
                // Points (Cities)
                pointsData={pointsData}
                pointLat="lat"
                pointLng="lng"
                pointColor="color"
                pointAltitude={0.01}
                pointRadius="size"
                pointLabel={getPointLabel}
                onPointClick={handlePointClick}
                // Arcs (Routes)
                arcsData={arcsData}
                arcStartLat="startLat"
                arcStartLng="startLng"
                arcEndLat="endLat"
                arcEndLng="endLng"
                arcColor="color"
                arcAltitude={isMobile ? 0.1 : 0.12}
                arcStroke={isMobile ? 0.3 : 0.4}
                arcDashLength={0.5}
                arcDashGap={0.3}
                arcDashAnimateTime={isMobile ? 3000 : 2000}
                arcLabel={getArcLabel}
              />
            </Suspense>
          ) : (
            <GlobeLoader />
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10 md:mt-14 max-w-3xl mx-auto"
        >
          {[
            { value: '50+', label: 'Countries', color: 'text-primary' },
            { value: '22', label: 'City Hubs', color: 'text-cyan-400' },
            { value: '13', label: 'Active Routes', color: 'text-orange-400' },
            { value: '24/7', label: 'Support', color: 'text-green-400' },
          ].map(({ value, label, color }) => (
            <div key={label} className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
              <div className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Interactive hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-xs mt-6"
        >
          {isMobile ? 'Touch and drag to explore' : 'Click on cities to view details • Hover for route info • Scroll to zoom'}
        </motion.p>
      </div>

      {/* City Detail Modal */}
      <AnimatePresence>
        {selectedCity && (
          <CityModal city={selectedCity} onClose={() => setSelectedCity(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default LogisticsGlobe;
