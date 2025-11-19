import ServiceCard from "@/components/ServiceCard";
import {
  Plane,
  Ship,
  Truck,
  Package,
  FileText,
  BarChart3,
  Container,
  MapPin,
  Boxes,
  Clock,
  Shield,
  Headphones,
} from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Poppins']">Our Services</h1>
            <p className="text-xl text-primary-foreground/90">
              Comprehensive logistics solutions designed to meet all your shipping and supply chain needs
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">Core Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional logistics services tailored to your business requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Plane}
              title="Air Freight"
              description="Expedited air cargo services for time-sensitive shipments. Fast transit times with door-to-door delivery options and real-time tracking."
            />
            <ServiceCard
              icon={Ship}
              title="Ocean Freight"
              description="Cost-effective sea freight solutions for FCL and LCL shipments. Competitive rates with flexible scheduling and global port coverage."
            />
            <ServiceCard
              icon={Truck}
              title="Road Transport"
              description="Reliable ground transportation services across borders. Full truckload (FTL) and less than truckload (LTL) options available."
            />
            <ServiceCard
              icon={Package}
              title="Express Delivery"
              description="Same-day and next-day delivery services for urgent shipments. Fast, secure, and reliable express courier solutions."
            />
            <ServiceCard
              icon={Container}
              title="Container Services"
              description="Full container load (FCL) and less container load (LCL) services with flexible container options and efficient loading."
            />
            <ServiceCard
              icon={Boxes}
              title="Warehousing"
              description="Secure storage facilities with inventory management, order fulfillment, and distribution services in strategic locations."
            />
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">Additional Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive support services to complement your logistics needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={FileText}
              title="Customs Clearance"
              description="Expert customs brokerage services ensuring smooth clearance of your international shipments with all necessary documentation."
            />
            <ServiceCard
              icon={BarChart3}
              title="Supply Chain Management"
              description="Comprehensive end-to-end supply chain solutions that optimize your entire logistics network. We analyze, design, and implement strategies to reduce costs, improve efficiency, and enhance visibility across your supply chain operations."
            />
            <ServiceCard
              icon={MapPin}
              title="Project Cargo"
              description="Specialized handling of oversized, heavy, and complex cargo with customized logistics planning and execution."
            />
            <ServiceCard
              icon={Clock}
              title="Just-in-Time Delivery"
              description="Precision timing for manufacturing and retail operations. Minimize inventory costs with our JIT delivery services."
            />
            <ServiceCard
              icon={Shield}
              title="Cargo Insurance"
              description="Comprehensive insurance coverage protecting your shipments against loss or damage during transit worldwide."
            />
            <ServiceCard
              icon={Headphones}
              title="24/7 Support"
              description="Round-the-clock customer support ensuring you always have access to information and assistance when needed."
            />
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">Why Our Services Stand Out</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              What makes Team Global Logistics your best choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4 p-6 rounded-lg bg-card border border-border">
              <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 font-['Poppins']">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Advanced security protocols and reliable handling ensure your cargo arrives safely every time.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-lg bg-card border border-border">
              <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 font-['Poppins']">Real-Time Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your shipments 24/7 with our advanced tracking system for complete visibility.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-lg bg-card border border-border">
              <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 font-['Poppins']">On-Time Guarantee</h3>
                <p className="text-muted-foreground">
                  99.9% on-time delivery rate backed by our commitment to meeting your deadlines.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 rounded-lg bg-card border border-border">
              <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 font-['Poppins']">Expert Support</h3>
                <p className="text-muted-foreground">
                  Dedicated account managers and 24/7 customer support to assist you at every step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
