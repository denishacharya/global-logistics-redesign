import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Globe, Truck } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const PartnerSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
            Our Strategic Partner
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expanding our reach across South Asia through trusted partnerships
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Card className="max-w-4xl mx-auto border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-primary/5 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-['Poppins']">Jayesh Logistics</h3>
                      <p className="text-muted-foreground">India Partner</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Our trusted partner in India, Jayesh Logistics provides comprehensive multi-modal freight services, 
                    port handling, and warehouse management across the Indo-Nepal corridor and South Asian region.
                  </p>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild className="w-fit">
                      <a 
                        href="https://jayeshlogistics.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Visit Website <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
                
                <div className="p-8 space-y-4">
                  <h4 className="font-semibold text-lg font-['Poppins']">Key Services</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-muted-foreground">Multi-modal freight forwarding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-muted-foreground">Port handling & customs clearance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-muted-foreground">Warehouse management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-muted-foreground">Indo-Nepal corridor services</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Kolkata, India</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PartnerSection;
