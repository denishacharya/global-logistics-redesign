import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Demo submission
    toast.success("Thank you for contacting us! We'll get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Poppins']">Contact Us</h1>
            <p className="text-xl text-primary-foreground/90">
              Get in touch with our team for quotes, inquiries, or support. We're here to help 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="border-border text-center hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2 font-['Poppins']">Phone</h3>
                <p className="text-muted-foreground text-sm">+977 1 234 5678</p>
                <p className="text-muted-foreground text-sm">+977 1 234 5679</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2 font-['Poppins']">Email</h3>
                <p className="text-muted-foreground text-sm">info@teamglobal.com.np</p>
                <p className="text-muted-foreground text-sm">support@teamglobal.com.np</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2 font-['Poppins']">Address</h3>
                <p className="text-muted-foreground text-sm">123 Logistics Street</p>
                <p className="text-muted-foreground text-sm">Kathmandu, Nepal</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2 font-['Poppins']">Business Hours</h3>
                <p className="text-muted-foreground text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground text-sm">24/7 Support Available</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-['Poppins']">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+977 98xxxxxxxx"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Quote request for ocean freight"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your shipping needs..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-['Poppins']">Our Location</CardTitle>
                <CardDescription>Visit us at our main office in Kathmandu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6565847987387!2d85.31426431506227!3d27.69495498279891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQxJzQxLjgiTiA4NcKwMTgnNTkuMCJF!5e0!3m2!1sen!2snp!4v1234567890123!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Team Global Logistics Office Location"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 font-['Poppins']">Get Directions</h4>
                    <p className="text-sm text-muted-foreground">
                      Our office is conveniently located in the heart of Kathmandu, easily accessible by public
                      transport and with ample parking facilities.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 font-['Poppins']">Branch Offices</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Pokhara Office: +977 61 123 456</li>
                      <li>• Biratnagar Office: +977 21 123 456</li>
                      <li>• Chitwan Office: +977 56 123 456</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Request a quote today and discover how Team Global Logistics can streamline your shipping operations
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Request a Quote
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
