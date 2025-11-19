import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";

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

const Team = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Our Team - Team Global Logistics"
        description="Meet the expert team behind Team Global Logistics. Our experienced professionals ensure reliable and efficient logistics solutions."
        keywords="Team Global Logistics team, logistics experts, logistics professionals"
      />

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Poppins']">Our Expert Team</h1>
            <p className="text-xl text-primary-foreground/90">
              Meet the professionals driving excellence in global logistics
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
              Leadership & Expertise
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our team combines decades of logistics experience with innovative thinking to deliver exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                index={index}
                inView={teamInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-secondary"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide our team every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in every shipment, every interaction, and every solution we provide."
              },
              {
                title: "Integrity",
                description: "Our commitment to transparency and honesty builds lasting trust with our clients and partners."
              },
              {
                title: "Innovation",
                description: "We embrace new technologies and methodologies to stay ahead in the logistics industry."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border h-full">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3 font-['Poppins'] text-primary">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Team;
