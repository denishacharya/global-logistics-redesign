import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

const team = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "20+ years of experience in global logistics. Visionary leader driving innovation in supply chain management across Nepal and international markets.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "Expert in logistics operations with focus on efficiency and customer satisfaction. Manages our global network of partners and carriers.",
  },
  {
    id: 3,
    name: "Amit Thapa",
    role: "Head of Air Freight",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    bio: "Specialist in international air cargo with extensive network across Asia and Europe. Ensures rapid and secure air freight solutions.",
  },
  {
    id: 4,
    name: "Sita Rai",
    role: "Customer Relations Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Dedicated to building lasting relationships with clients. Ensures every shipment receives personalized attention and care.",
  },
];

const floatingIcons = [];

interface TeamCardProps {
  member: typeof team[0];
  index: number;
  inView: boolean;
}

const TeamCard = ({ member, index, inView }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <Card className="border-border bg-card overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2">

        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 font-['Poppins'] group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="text-sm text-accent font-medium mb-3">
              {member.role}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {member.bio}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TeamSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
            Our Expert Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the professionals driving excellence in global logistics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
