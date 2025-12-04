import { useState, useMemo, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';
import { X, Plane, Ship, Truck } from 'lucide-react';
import locationsData from '@/data/globe-locations.json';
import routesData from '@/data/globe-routes.json';

// High quality TopoJSON world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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

// Route colors
const ROUTE_COLORS = {
  air: '#FF6B6B',
  ocean: '#4ECDC4',
  road: '#95D44A',
};

const SERVICE_ICONS = {
  air: Plane,
  ocean: Ship,
  road: Truck,
};

// Globe Loader
const GlobeLoader = () => (
  <div className="flex flex-col items-center justify-center h-[400px] md:h-[500px]">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-pulse" />
      <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-primary rounded-full animate-spin" />
    </div>
    <p className="mt-4 text-gray-400 text-sm animate-pulse">Loading your logistics globe...</p>
  </div>
);

// City Modal
const CityModal = memo(({ city, onClose }: { city: Location | null; onClose: () => void }) => {
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
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded-lg transition-colors">
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
                    service === 'ocean' ? 'bg-teal-500/20 text-teal-400' :
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
                    route.type === 'ocean' ? 'text-teal-400' : 'text-green-400'
                  }`}>{route.transitTime}</span>
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
});

CityModal.displayName = 'CityModal';

// Animated marker component
const AnimatedMarker = memo(({ 
  location, 
  onClick, 
  isHovered, 
  onHover 
}: { 
  location: Location; 
  onClick: () => void;
  isHovered: boolean;
  onHover: (name: string | null) => void;
}) => {
  const markerSize = location.isHub ? 12 : 8;
  const color = location.isHub ? '#FFA500' : '#00D4FF';
  
  return (
    <Marker coordinates={[location.lng, location.lat]}>
      <g 
        onClick={onClick}
        onMouseEnter={() => onHover(location.name)}
        onMouseLeave={() => onHover(null)}
        style={{ cursor: 'pointer' }}
      >
        {/* Pulse animation for hub cities */}
        {location.isHub && (
          <circle
            r={markerSize + 8}
            fill={color}
            opacity={0.2}
            className="animate-ping"
          />
        )}
        {/* Outer glow */}
        <circle
          r={markerSize + 4}
          fill={color}
          opacity={isHovered ? 0.4 : 0.2}
          style={{ transition: 'opacity 0.2s ease' }}
        />
        {/* Main marker */}
        <circle
          r={markerSize}
          fill={color}
          stroke="white"
          strokeWidth={2}
          style={{ 
            filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.6))',
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.2s ease'
          }}
        />
        {/* City name tooltip */}
        {isHovered && (
          <g>
            <rect
              x={-40}
              y={-35}
              width={80}
              height={24}
              rx={4}
              fill="rgba(0, 0, 0, 0.85)"
            />
            <text
              textAnchor="middle"
              y={-18}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fill: 'white',
                fontWeight: 500,
              }}
            >
              {location.name}
            </text>
          </g>
        )}
      </g>
    </Marker>
  );
});

AnimatedMarker.displayName = 'AnimatedMarker';

// Animated route line
const RouteLine = memo(({ route }: { route: Route }) => {
  const color = ROUTE_COLORS[route.type];
  
  return (
    <Line
      from={[route.startLng, route.startLat]}
      to={[route.endLng, route.endLat]}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeDasharray="6 4"
      style={{
        filter: `drop-shadow(0 0 4px ${color})`,
      }}
    />
  );
});

RouteLine.displayName = 'RouteLine';

const LogisticsGlobe = () => {
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const rotationRef = useRef<number | null>(null);

  // Lazy loading with intersection observer
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px',
  });

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotation animation
  useEffect(() => {
    if (!inView || !isLoaded) return;
    
    const rotationSpeed = isHovered ? 0.15 : 0.05;
    
    const animate = () => {
      setRotation(prev => (prev + rotationSpeed) % 360);
      rotationRef.current = requestAnimationFrame(animate);
    };
    
    rotationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rotationRef.current) {
        cancelAnimationFrame(rotationRef.current);
      }
    };
  }, [inView, isHovered, isLoaded]);

  // Memoized data
  const locations = useMemo(() => locationsData.locations as Location[], []);
  const routes = useMemo(() => {
    const allRoutes = routesData.routes as Route[];
    return isMobile ? allRoutes.filter((_, i) => i % 2 === 0) : allRoutes;
  }, [isMobile]);

  const handleCityClick = useCallback((city: Location) => {
    setSelectedCity(city);
  }, []);

  const handleHover = useCallback((name: string | null) => {
    setHoveredCity(name);
  }, []);

  // Map projection configuration
  const projection = useMemo(() => ({
    rotate: [-rotation - 80, -20, 0] as [number, number, number],
    scale: isMobile ? 180 : 220,
  }), [rotation, isMobile]);

  return (
    <section 
      id="services-globe" 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0066B3 0%, #004080 50%, #002850 100%)'
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Poppins'] text-white">
            Countries We Serve Worldwide
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Air, Ocean & Road Freight Connections Across 50+ Countries
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6"
        >
          {[
            { type: 'Air Freight', color: ROUTE_COLORS.air, icon: Plane },
            { type: 'Ocean Freight', color: ROUTE_COLORS.ocean, icon: Ship },
            { type: 'Road Transport', color: ROUTE_COLORS.road, icon: Truck },
          ].map(({ type, color, icon: Icon }) => (
            <div key={type} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
              <Icon className="w-4 h-4 text-white/80" />
              <span className="text-xs md:text-sm text-white/90">{type}</span>
            </div>
          ))}
        </motion.div>

        {/* Globe Container */}
        <motion.div
          ref={inViewRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center items-center mx-auto relative"
          style={{ maxWidth: '800px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {inView ? (
            <div className="relative w-full aspect-square max-w-[600px] md:max-w-[700px]">
              {/* Globe shadow/glow */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.1)',
                }}
              />
              
              {/* Globe container with shadow */}
              <div 
                className="relative w-full h-full"
                style={{
                  filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.4))',
                }}
              >
                <ComposableMap
                  projection="geoOrthographic"
                  projectionConfig={projection}
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* Globe background with gradient */}
                  <defs>
                    <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DAEAF6" stopOpacity="0.9" />
                      <stop offset="40%" stopColor="#B5D4E8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8FBFDC" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="globeShadow">
                      <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(0,0,0,0.3)" />
                    </filter>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Ocean/globe sphere */}
                  <circle 
                    cx={350} 
                    cy={350} 
                    r={isMobile ? 180 : 220} 
                    fill="url(#globeGradient)"
                    filter="url(#globeShadow)"
                  />
                  
                  {/* Countries */}
                  <Geographies geography={geoUrl}>
                    {({ geographies }) => {
                      if (!isLoaded) {
                        setTimeout(() => setIsLoaded(true), 100);
                      }
                      return geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#005BAC"
                          stroke="#0066B3"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { outline: 'none', fill: '#0077CC' },
                            pressed: { outline: 'none' },
                          }}
                        />
                      ));
                    }}
                  </Geographies>

                  {/* Route lines */}
                  {routes.map((route, idx) => (
                    <RouteLine key={`route-${idx}`} route={route} />
                  ))}

                  {/* Location markers */}
                  {locations.map((location) => (
                    <AnimatedMarker
                      key={location.name}
                      location={location}
                      onClick={() => handleCityClick(location)}
                      isHovered={hoveredCity === location.name}
                      onHover={handleHover}
                    />
                  ))}
                </ComposableMap>
              </div>
            </div>
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
            { value: '50+', label: 'Countries', color: 'text-white' },
            { value: '22', label: 'City Hubs', color: 'text-cyan-300' },
            { value: '13', label: 'Active Routes', color: 'text-orange-300' },
            { value: '24/7', label: 'Support', color: 'text-green-300' },
          ].map(({ value, label, color }) => (
            <div key={label} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
              <div className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</div>
              <div className="text-xs md:text-sm text-white/70 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Interactive hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white/50 text-xs mt-6"
        >
          Click on cities to view service details • Hover for city names
        </motion.p>
      </div>

      {/* City Modal */}
      <AnimatePresence>
        {selectedCity && (
          <CityModal city={selectedCity} onClose={() => setSelectedCity(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default LogisticsGlobe;
