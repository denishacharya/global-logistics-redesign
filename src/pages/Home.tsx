import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import ServiceCard from "@/components/ServiceCard";
import { Plane, Ship, Truck, Package, Globe, Clock, Shield, Award } from "lucide-react";
import heroImage from "@/assets/hero-logistics.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 font-['Poppins']">
            Global Logistics Solutions
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Fast, reliable, and secure shipping services connecting you to the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <NavLink to="/contact">Get a Quote</NavLink>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 border-white text-white hover:bg-white/20">
              <NavLink to="/tracking">Track Shipment</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary mb-2 font-['Poppins']">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold text-primary mb-2 font-['Poppins']">50+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-primary mb-2 font-['Poppins']">10K+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl font-bold text-primary mb-2 font-['Poppins']">99.9%</div>
              <div className="text-muted-foreground">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive logistics solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={Plane}
              title="Air Freight"
              description="Fast and efficient air cargo services for urgent shipments worldwide"
            />
            <ServiceCard
              icon={Ship}
              title="Ocean Freight"
              description="Cost-effective sea freight solutions for large volume shipments"
            />
            <ServiceCard
              icon={Truck}
              title="Road Transport"
              description="Reliable ground transportation across national and international routes"
            />
            <ServiceCard
              icon={Package}
              title="Warehousing"
              description="Secure storage and distribution facilities with inventory management"
            />
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your trusted partner for seamless global logistics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Globe className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-['Poppins']">Global Network</h3>
              <p className="text-muted-foreground">
                Extensive worldwide network ensuring your cargo reaches any destination
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-['Poppins']">On-Time Delivery</h3>
              <p className="text-muted-foreground">
                Committed to meeting deadlines with 99.9% on-time performance
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-['Poppins']">Secure Handling</h3>
              <p className="text-muted-foreground">
                Advanced security measures to protect your valuable shipments
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-['Poppins']">Industry Certified</h3>
              <p className="text-muted-foreground">
                ISO certified with international quality standards compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">
            Ready to Ship with Us?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Get started with Team Global Logistics today and experience world-class shipping services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <NavLink to="/contact">Contact Us Now</NavLink>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white text-primary hover:bg-white/90">
              <NavLink to="/about">Learn More</NavLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
