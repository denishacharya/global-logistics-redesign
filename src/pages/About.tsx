import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users, TrendingUp } from "lucide-react";
import aboutTeamImage from "@/assets/about-team.jpg";
import TeamSection from "@/components/TeamSection";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Poppins']">About Team Global Logistics</h1>
            <p className="text-xl text-primary-foreground/90">
              Building bridges across continents with reliable, innovative logistics solutions since 2008
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">Our Story</h2>
              <p className="text-muted-foreground text-lg mb-4">
                Team Global Logistics was founded with a vision to revolutionize the logistics industry by providing
                seamless, reliable, and innovative shipping solutions. What started as a small freight forwarding
                company has grown into a global logistics powerhouse.
              </p>
              <p className="text-muted-foreground text-lg mb-4">
                Over the years, we've expanded our network to cover more than 50 countries, serving thousands of
                satisfied clients across various industries. Our commitment to excellence and customer satisfaction
                has been the cornerstone of our success.
              </p>
              <p className="text-muted-foreground text-lg">
                Today, we're proud to be recognized as one of the leading logistics providers, known for our
                reliability, efficiency, and innovative approach to solving complex supply chain challenges.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src={aboutTeamImage}
                alt="Team Global Logistics Team"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-border animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Target className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 font-['Poppins']">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To provide world-class logistics solutions that empower businesses to reach global markets
                      efficiently and reliably. We strive to be the bridge that connects businesses worldwide through
                      innovative, sustainable, and customer-centric shipping services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Eye className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 font-['Poppins']">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To be the most trusted and innovative logistics partner globally, setting new standards in
                      efficiency, sustainability, and customer satisfaction. We envision a world where distance is no
                      barrier to business growth and international trade flourishes seamlessly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border text-center hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-['Poppins']">Customer First</h3>
                <p className="text-muted-foreground">
                  We prioritize our clients' needs and go above and beyond to ensure their satisfaction and success.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-['Poppins']">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously adopt new technologies and methodologies to improve our services and efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-['Poppins']">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in every aspect of our operations and service delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">Our Team</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our success is driven by a dedicated team of logistics professionals with decades of combined
              experience. From customer service representatives to supply chain experts, every team member is
              committed to delivering excellence.
            </p>
            <p className="text-muted-foreground text-lg">
              With expertise spanning air freight, ocean shipping, customs clearance, and warehousing, we have the
              knowledge and skills to handle any logistics challenge. Our team works around the clock to ensure your
              shipments arrive safely and on time.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <TeamSection />
    </div>
  );
};

export default About;
