import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import ServiceCard from "@/components/ServiceCard";
import AnimatedSection from "@/components/AnimatedSection";
import Testimonials from "@/components/Testimonials";
import ClientLogos from "@/components/ClientLogos";
import MetricsDashboard from "@/components/MetricsDashboard";
import TeamSection from "@/components/TeamSection";
import FAQ from "@/components/FAQ";
import SEOHead, { OrganizationSchema } from "@/components/SEOHead";
import { Plane, Ship, Truck, Package, Globe, Clock, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import heroImage from "@/assets/hero-logistics.jpg";

const Home = () => {
  const floatingIconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // GSAP floating animation for hero icons
    floatingIconsRef.current.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          y: -20,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Team Global Logistics - Best Cargo & Logistics Company in Nepal"
        description="Leading logistics company in Nepal offering air freight, sea freight, road transport, warehousing and import/export services. 15+ years experience, 50+ countries served."
        keywords="Team Global Logistics, logistics Nepal, cargo Nepal, air freight Nepal, sea freight Nepal, import export Nepal, best logistics company Nepal"
      />
      <OrganizationSchema />

      {/* Hero Section with Parallax & Floating Icons */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <div 
            ref={(el) => (floatingIconsRef.current[0] = el)}
            className="absolute top-20 left-10 text-white/20"
          >
            <Plane className="h-16 w-16" />
          </div>
          <div 
            ref={(el) => (floatingIconsRef.current[1] = el)}
            className="absolute top-40 right-20 text-white/20"
          >
            <Ship className="h-20 w-20" />
          </div>
          <div 
            ref={(el) => (floatingIconsRef.current[2] = el)}
            className="absolute bottom-40 left-20 text-white/20"
          >
            <Truck className="h-14 w-14" />
          </div>
          <div 
            ref={(el) => (floatingIconsRef.current[3] = el)}
            className="absolute bottom-20 right-10 text-white/20"
          >
            <Package className="h-12 w-12" />
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8"
          >
            <DotLottieReact
              src="https://lottie.host/f7a52b07-04c1-4357-871e-e89ae09c15e4/lODuOEtY8G.lottie"
              loop
              autoplay
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 font-['Poppins']"
          >
            Team Global Logistics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto"
          >
            Nepal's Premier Cargo & Logistics Partner - Connecting Businesses Worldwide with Fast, Reliable, and Secure Shipping Solutions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all">
                <NavLink to="/contact">Get a Quote</NavLink>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Metrics Dashboard with Charts */}
      <MetricsDashboard />

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive logistics solutions tailored to your business needs
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedSection delay={0}>
              <ServiceCard
                icon={Plane}
                title="Air Freight"
                description="Fast and efficient air cargo services for urgent shipments worldwide"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <ServiceCard
                icon={Ship}
                title="Ocean Freight"
                description="Cost-effective sea freight solutions for large volume shipments"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <ServiceCard
                icon={Truck}
                title="Road Transport"
                description="Reliable ground transportation across national and international routes"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <ServiceCard
                icon={Package}
                title="Warehousing"
                description="Secure storage and distribution facilities with inventory management"
              />
            </AnimatedSection>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" variant="outline">
              <NavLink to="/services">View All Services</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your trusted partner for seamless global logistics
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={0}>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Globe className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-['Poppins']">Global Network</h3>
                <p className="text-muted-foreground">
                  Extensive worldwide network ensuring your cargo reaches any destination
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-['Poppins']">On-Time Delivery</h3>
                <p className="text-muted-foreground">
                  Committed to meeting deadlines with 99.9% on-time performance
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-['Poppins']">Secure Handling</h3>
                <p className="text-muted-foreground">
                  Advanced security measures to protect your valuable shipments
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Award className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-['Poppins']">Industry Certified</h3>
                <p className="text-muted-foreground">
                  ISO certified with international quality standards compliance
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Team Section */}
      <TeamSection />

      {/* FAQ Section */}
      <FAQ />

      {/* Client Logos */}
      <ClientLogos />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">
              Ready to Ship with Us?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Get started with Team Global Logistics today and experience world-class shipping services
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 hover:scale-105 transition-transform">
                <NavLink to="/contact">Contact Us Now</NavLink>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform">
                <NavLink to="/about">Learn More</NavLink>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

// Animated Stats Component
const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <div className="text-4xl font-bold text-primary mb-2 font-['Poppins']">
              {inView && <CountUp end={15} duration={2} />}+
            </div>
            <div className="text-muted-foreground">Years Experience</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-4xl font-bold text-primary mb-2 font-['Poppins']">
              {inView && <CountUp end={50} duration={2} />}+
            </div>
            <div className="text-muted-foreground">Countries Served</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-4xl font-bold text-primary mb-2 font-['Poppins']">
              {inView && <CountUp end={10000} duration={2} separator="," />}+
            </div>
            <div className="text-muted-foreground">Happy Clients</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-4xl font-bold text-primary mb-2 font-['Poppins']">
              {inView && <CountUp end={99.9} duration={2} decimals={1} />}%
            </div>
            <div className="text-muted-foreground">On-Time Delivery</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
