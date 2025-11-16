import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, Global Trade Inc",
    content: "Team Global Logistics has been instrumental in streamlining our supply chain. Their professionalism and reliability are unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Operations Manager, Tech Solutions",
    content: "Outstanding service! They handle our international shipments with care and precision. Highly recommended for any business needs.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Logistics Director, Manufacturing Co",
    content: "Their real-time tracking and customer support have transformed how we manage our logistics. A true partner in our success.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by businesses worldwide for reliable logistics solutions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-border bg-card">
                <CardContent className="pt-12 pb-8 px-8">
                  <Quote className="h-12 w-12 text-accent mb-6 mx-auto" />
                  <p className="text-lg text-foreground/90 mb-8 text-center italic">
                    "{testimonials[current].content}"
                  </p>
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground font-['Poppins']">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[current].position}
                    </p>
                    <div className="flex justify-center gap-1 mt-3">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <span key={i} className="text-accent">★</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === current ? "bg-accent w-8" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
