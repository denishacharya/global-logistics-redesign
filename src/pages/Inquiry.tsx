import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { FileText, Package, Globe, Ship, CheckCircle2 } from "lucide-react";

interface InquiryFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  productName: string;
  hsCode: string;
  quantity: string;
  unit: string;
  targetPrice: string;
  incoterms: string;
  paymentTerms: string;
  destinationPort: string;
  requiredCertificates: string;
  additionalRequirements: string;
}

const Inquiry = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    productName: "",
    hsCode: "",
    quantity: "",
    unit: "MT",
    targetPrice: "",
    incoterms: "FOB",
    paymentTerms: "",
    destinationPort: "",
    requiredCertificates: "",
    additionalRequirements: "",
  });

  const handleChange = (field: keyof InquiryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.companyName || !formData.productName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store in localStorage for demo purposes
      const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      const newInquiry = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      inquiries.push(newInquiry);
      localStorage.setItem('inquiries', JSON.stringify(inquiries));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Inquiry Submitted Successfully",
        description: "We'll review your quotation request and respond within 24 hours.",
      });

      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        country: "",
        productName: "",
        hsCode: "",
        quantity: "",
        unit: "MT",
        targetPrice: "",
        incoterms: "FOB",
        paymentTerms: "",
        destinationPort: "",
        requiredCertificates: "",
        additionalRequirements: "",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: FileText,
      title: "Instant Quotation",
      description: "Get detailed quotes within 24 hours"
    },
    {
      icon: Package,
      title: "Product Specifications",
      description: "Clear pricing and technical details"
    },
    {
      icon: Globe,
      title: "Global Shipping",
      description: "Worldwide delivery options"
    },
    {
      icon: Ship,
      title: "Flexible Terms",
      description: "Multiple Incoterms and payment options"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Request Quotation - Team Global Logistics"
        description="Request a detailed quotation for import-export services. Get competitive pricing, shipping terms, and professional support for your international trade needs."
        keywords="import export quotation, international trade quote, shipping quote, freight quotation, export pricing"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Request a Quotation
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Get competitive pricing for your import-export needs. Fill out the form below and our team will provide a detailed quotation within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quotation Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Quotation Request Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      Company Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleChange('companyName', e.target.value)}
                          required
                          placeholder="Your Company Ltd."
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input
                          id="contactPerson"
                          value={formData.contactPerson}
                          onChange={(e) => handleChange('contactPerson', e.target.value)}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          placeholder="contact@company.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          required
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleChange('country', e.target.value)}
                          required
                          placeholder="United States"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Package className="w-5 h-5 text-accent" />
                      Product Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="productName">Product Name *</Label>
                        <Input
                          id="productName"
                          value={formData.productName}
                          onChange={(e) => handleChange('productName', e.target.value)}
                          required
                          placeholder="e.g., Basmati Rice, Cotton Fabric"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hsCode">HS Code (if known)</Label>
                        <Input
                          id="hsCode"
                          value={formData.hsCode}
                          onChange={(e) => handleChange('hsCode', e.target.value)}
                          placeholder="e.g., 1006.30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity *</Label>
                        <div className="flex gap-2">
                          <Input
                            id="quantity"
                            value={formData.quantity}
                            onChange={(e) => handleChange('quantity', e.target.value)}
                            required
                            placeholder="1000"
                            className="flex-1"
                          />
                          <Select
                            value={formData.unit}
                            onValueChange={(value) => handleChange('unit', value)}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MT">MT</SelectItem>
                              <SelectItem value="KG">KG</SelectItem>
                              <SelectItem value="PCS">PCS</SelectItem>
                              <SelectItem value="TONS">TONS</SelectItem>
                              <SelectItem value="CBM">CBM</SelectItem>
                              <SelectItem value="CONTAINER">Container</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="targetPrice">Target Price (USD)</Label>
                        <Input
                          id="targetPrice"
                          value={formData.targetPrice}
                          onChange={(e) => handleChange('targetPrice', e.target.value)}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping & Terms */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Ship className="w-5 h-5 text-accent" />
                      Shipping & Terms
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="incoterms">Incoterms *</Label>
                        <Select
                          value={formData.incoterms}
                          onValueChange={(value) => handleChange('incoterms', value)}
                        >
                          <SelectTrigger id="incoterms">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FOB">FOB - Free on Board</SelectItem>
                            <SelectItem value="CIF">CIF - Cost, Insurance & Freight</SelectItem>
                            <SelectItem value="CFR">CFR - Cost and Freight</SelectItem>
                            <SelectItem value="EXW">EXW - Ex Works</SelectItem>
                            <SelectItem value="DDP">DDP - Delivered Duty Paid</SelectItem>
                            <SelectItem value="DAP">DAP - Delivered at Place</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="destinationPort">Destination Port *</Label>
                        <Input
                          id="destinationPort"
                          value={formData.destinationPort}
                          onChange={(e) => handleChange('destinationPort', e.target.value)}
                          required
                          placeholder="e.g., Los Angeles, USA"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="paymentTerms">Payment Terms</Label>
                        <Input
                          id="paymentTerms"
                          value={formData.paymentTerms}
                          onChange={(e) => handleChange('paymentTerms', e.target.value)}
                          placeholder="e.g., 30% advance, 70% against documents"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="requiredCertificates">Required Certificates</Label>
                        <Input
                          id="requiredCertificates"
                          value={formData.requiredCertificates}
                          onChange={(e) => handleChange('requiredCertificates', e.target.value)}
                          placeholder="e.g., ISO, SGS, Phytosanitary Certificate"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                    <Textarea
                      id="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={(e) => handleChange('additionalRequirements', e.target.value)}
                      rows={4}
                      placeholder="Please provide any additional information about your requirements, packaging preferences, quality standards, etc."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Quotation Request"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Fields marked with * are required. We typically respond within 24 hours during business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why Request a Quote from Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">24h</div>
                  <p className="font-semibold mb-2">Quick Response</p>
                  <p className="text-sm text-muted-foreground">Fast turnaround on all quotations</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">100%</div>
                  <p className="font-semibold mb-2">Transparency</p>
                  <p className="text-sm text-muted-foreground">Clear pricing with no hidden costs</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">15+</div>
                  <p className="font-semibold mb-2">Years Experience</p>
                  <p className="text-sm text-muted-foreground">Trusted by global partners</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Inquiry;
