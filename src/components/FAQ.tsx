import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Package, Clock, Plane, Ship, Truck, DollarSign } from "lucide-react";

const faqs = [
  {
    id: "1",
    icon: Package,
    question: "How can I track my shipment?",
    answer: "You can track your shipment 24/7 using our online tracking system. Simply enter your tracking number on our website or mobile app. You'll receive real-time updates on your shipment's location and status, including customs clearance and estimated delivery time.",
  },
  {
    id: "2",
    icon: Clock,
    question: "What are the delivery times for Nepal and international shipments?",
    answer: "Delivery times vary by destination and service type. For Nepal domestic shipments: 1-2 days within Kathmandu Valley, 2-4 days to other major cities. International shipments: Air freight 3-7 days, Sea freight 15-45 days depending on destination. Express services available for urgent deliveries.",
  },
  {
    id: "3",
    icon: Plane,
    question: "What types of air freight services do you offer?",
    answer: "We offer comprehensive air freight solutions including: Standard air cargo for regular shipments, Express air freight for time-sensitive deliveries, Charter services for oversized cargo, Door-to-door delivery, and Temperature-controlled transport for sensitive goods. All services include customs clearance and insurance options.",
  },
  {
    id: "4",
    icon: Ship,
    question: "Do you provide ocean freight services?",
    answer: "Yes, we offer full-container load (FCL) and less-than-container load (LCL) sea freight services worldwide. Our ocean freight solutions include port-to-port, door-to-port, and door-to-door services. We handle all documentation, customs clearance, and provide cargo insurance options.",
  },
  {
    id: "5",
    icon: Truck,
    question: "What is your road transport coverage?",
    answer: "Our road transport network covers all major cities and towns across Nepal, as well as cross-border routes to India, China, and other neighboring countries. We operate a modern fleet of trucks suitable for various cargo types, from small parcels to heavy machinery.",
  },
  {
    id: "6",
    icon: DollarSign,
    question: "How do I get a quotation for my shipment?",
    answer: "Getting a quote is easy! Simply fill out our online quote request form with shipment details (origin, destination, weight, dimensions, cargo type), or contact our customer service team via phone or email. We'll provide a detailed quotation within 2-4 hours including all applicable charges, estimated transit time, and service recommendations.",
  },
];

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about our logistics services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <AccordionItem
                  value={faq.id}
                  className="border border-border bg-card rounded-lg px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-2 rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <faq.icon className="h-5 w-5" />
                      </div>
                      <span className="font-semibold text-foreground font-['Poppins']">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pl-14">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
