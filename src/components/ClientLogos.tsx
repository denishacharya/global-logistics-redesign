import { motion } from "framer-motion";

const clients = [
  { name: "Global Trade Inc", logo: "GT" },
  { name: "Tech Solutions", logo: "TS" },
  { name: "Manufacturing Co", logo: "MC" },
  { name: "Export Masters", logo: "EM" },
  { name: "Logistics Pro", logo: "LP" },
  { name: "Supply Chain Plus", logo: "SC" },
];

const ClientLogos = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12 font-['Poppins']"
        >
          Trusted by Leading Companies
        </motion.h2>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...clients, ...clients, ...clients].map((client, idx) => (
              <motion.div
                key={idx}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-card border border-border rounded-lg"
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "hsl(var(--accent))",
                  boxShadow: "0 0 20px rgba(255, 107, 0, 0.3)"
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-3xl font-bold text-primary font-['Poppins']"
                    whileHover={{ 
                      textShadow: "0 0 15px rgba(255, 107, 0, 0.5)"
                    }}
                  >
                    {client.logo}
                  </motion.div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {client.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
