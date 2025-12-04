import { useEffect, useRef, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';

/**
 * LOCATIONS ARRAY - Easy to edit!
 * Add new locations by adding objects with { name, lat, lng, country }
 */
const LOCATIONS = [
  // China
  { name: 'Guangzhou', lat: 23.1291, lng: 113.2644, country: 'China' },
  { name: 'Shenzhen', lat: 22.5431, lng: 114.0579, country: 'China' },
  { name: 'Yiwu', lat: 29.3069, lng: 120.0758, country: 'China' },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, country: 'China' },
  { name: 'Shanghai', lat: 31.2304, lng: 121.4737, country: 'China' },
  
  // India
  { name: 'Delhi', lat: 28.7041, lng: 77.1025, country: 'India' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, country: 'India' },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, country: 'India' },
  
  // Asia
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018, country: 'Thailand' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan' },
  { name: 'Seoul', lat: 37.5665, lng: 126.9780, country: 'South Korea' },
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456, country: 'Indonesia' },
  
  // USA
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, country: 'USA' },
  { name: 'New York', lat: 40.7128, lng: -74.0060, country: 'USA' },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298, country: 'USA' },
  
  // Europe
  { name: 'London', lat: 51.5074, lng: -0.1278, country: 'UK' },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, country: 'France' },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050, country: 'Germany' },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, country: 'Netherlands' },
  { name: 'Rome', lat: 41.9028, lng: 12.4964, country: 'Italy' },
  
  // Nepal (Destination hub)
  { name: 'Kathmandu', lat: 27.7172, lng: 85.3240, country: 'Nepal' },
  { name: 'Birgunj', lat: 27.0104, lng: 84.8821, country: 'Nepal' },
];

/**
 * ROUTES ARRAY - Easy to edit!
 * Add new routes by adding objects with:
 * - startLat, startLng: Origin coordinates
 * - endLat, endLng: Destination coordinates
 * - type: 'air' | 'ocean' | 'road'
 * Colors: Air = Red, Ocean = Blue, Road = Green
 */
const ROUTES = [
  // Air Routes (Red)
  { startLat: 23.1291, startLng: 113.2644, endLat: 27.7172, endLng: 85.3240, type: 'air', label: 'Guangzhou → Kathmandu' },
  { startLat: 22.3193, startLng: 114.1694, endLat: 34.0522, endLng: -118.2437, type: 'air', label: 'Hong Kong → Los Angeles' },
  { startLat: 28.7041, startLng: 77.1025, endLat: 27.7172, endLng: 85.3240, type: 'air', label: 'Delhi → Kathmandu' },
  { startLat: 51.5074, startLng: -0.1278, endLat: 27.7172, endLng: 85.3240, type: 'air', label: 'London → Kathmandu' },
  { startLat: 40.7128, startLng: -74.0060, endLat: 27.7172, endLng: 85.3240, type: 'air', label: 'New York → Kathmandu' },
  
  // Ocean Routes (Blue)
  { startLat: 22.5431, startLng: 114.0579, endLat: 22.5726, endLng: 88.3639, type: 'ocean', label: 'Shenzhen → Kolkata' },
  { startLat: 31.2304, startLng: 121.4737, endLat: 19.0760, endLng: 72.8777, type: 'ocean', label: 'Shanghai → Mumbai' },
  { startLat: 52.3676, startLng: 4.9041, endLat: 22.5726, endLng: 88.3639, type: 'ocean', label: 'Amsterdam → Kolkata' },
  { startLat: 34.0522, startLng: -118.2437, endLat: 19.0760, endLng: 72.8777, type: 'ocean', label: 'Los Angeles → Mumbai' },
  
  // Road Routes (Green)
  { startLat: 22.5431, startLng: 114.0579, endLat: 27.0104, endLng: 84.8821, type: 'road', label: 'Shenzhen → Birgunj' },
  { startLat: 28.7041, startLng: 77.1025, endLat: 27.0104, endLng: 84.8821, type: 'road', label: 'Delhi → Birgunj' },
  { startLat: 22.5726, startLng: 88.3639, endLat: 27.7172, endLng: 85.3240, type: 'road', label: 'Kolkata → Kathmandu' },
  { startLat: 19.0760, startLng: 72.8777, endLat: 27.0104, endLng: 84.8821, type: 'road', label: 'Mumbai → Birgunj' },
];

const getRouteColor = (type: string) => {
  switch (type) {
    case 'air': return 'rgba(255, 80, 80, 0.8)'; // Red
    case 'ocean': return 'rgba(80, 150, 255, 0.8)'; // Blue
    case 'road': return 'rgba(80, 255, 120, 0.8)'; // Green
    default: return 'rgba(255, 255, 255, 0.6)';
  }
};

const LogisticsGlobe = () => {
  const globeEl = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.offsetWidth, 800);
        const height = Math.min(width, 600);
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Auto-rotate globe
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = true;
      globeEl.current.pointOfView({ lat: 20, lng: 80, altitude: 2.5 });
    }
  }, []);

  // Prepare points data
  const pointsData = useMemo(() => 
    LOCATIONS.map(loc => ({
      ...loc,
      size: loc.country === 'Nepal' ? 0.15 : 0.08,
      color: loc.country === 'Nepal' ? '#FFA500' : '#00D4FF',
    })), 
  []);

  // Prepare arcs data
  const arcsData = useMemo(() => 
    ROUTES.map(route => ({
      ...route,
      color: getRouteColor(route.type),
    })), 
  []);

  return (
    <section id="services-globe" className="py-20 relative overflow-hidden" style={{ background: '#000' }}>
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins'] text-white">
            Countries We Serve Worldwide
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Air, Ocean & Road Freight Connections Across 50+ Countries
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded bg-red-500" />
            <span className="text-sm text-gray-300">Air Freight</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded bg-blue-500" />
            <span className="text-sm text-gray-300">Ocean Freight</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded bg-green-500" />
            <span className="text-sm text-gray-300">Road Transport</span>
          </div>
        </motion.div>

        {/* Globe Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          id="globe-container"
          className="flex justify-center items-center mx-auto"
          style={{ maxWidth: '800px' }}
        >
          <Globe
            ref={globeEl}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="#1D3A8A"
            atmosphereAltitude={0.25}
            pointsData={pointsData}
            pointLat="lat"
            pointLng="lng"
            pointColor="color"
            pointAltitude={0.01}
            pointRadius="size"
            pointLabel={(d: any) => `<div style="background: rgba(0,0,0,0.8); padding: 8px 12px; border-radius: 4px; color: white; font-size: 12px;"><strong>${d.name}</strong><br/>${d.country}</div>`}
            arcsData={arcsData}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor="color"
            arcAltitude={0.15}
            arcStroke={0.5}
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcLabel={(d: any) => `<div style="background: rgba(0,0,0,0.8); padding: 6px 10px; border-radius: 4px; color: white; font-size: 11px;">${d.label}</div>`}
          />
        </motion.div>

        {/* Stats below globe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-gray-400">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">✈ Air</div>
            <div className="text-sm text-gray-400">Express Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">🚢 Ocean</div>
            <div className="text-sm text-gray-400">Cost Effective</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">🚚 Road</div>
            <div className="text-sm text-gray-400">Regional Coverage</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LogisticsGlobe;
