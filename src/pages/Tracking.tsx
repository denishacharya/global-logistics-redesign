import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }
    
    setIsTracking(true);
    // Simulate tracking lookup
    setTimeout(() => {
      setIsTracking(false);
      toast.info("Tracking feature demo. In production, this would fetch real tracking data.");
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Poppins']">Track Your Shipment</h1>
            <p className="text-xl text-primary-foreground/90">
              Enter your tracking number to get real-time updates on your shipment location and status
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-['Poppins']">Enter Tracking Information</CardTitle>
              <CardDescription>
                You can track multiple shipments by entering multiple tracking numbers separated by commas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrack} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder="Enter tracking number (e.g., TGL123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isTracking} className="bg-primary hover:bg-primary/90">
                    <Search className="mr-2 h-4 w-4" />
                    {isTracking ? "Tracking..." : "Track"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Don't have a tracking number?{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Contact us
                  </a>{" "}
                  for assistance.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Demo Tracking Result */}
          {trackingNumber && (
            <div className="max-w-2xl mx-auto mt-8 animate-fade-in">
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-['Poppins']">Tracking Number: {trackingNumber || "TGL123456789"}</CardTitle>
                      <CardDescription>Estimated Delivery: 3-5 business days</CardDescription>
                    </div>
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Package className="h-6 w-6" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Timeline */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Order Received</div>
                          <div className="text-sm text-muted-foreground">Your shipment has been received at our facility</div>
                          <div className="text-xs text-muted-foreground mt-1">2 days ago</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">In Transit</div>
                          <div className="text-sm text-muted-foreground">Package is on the way to destination</div>
                          <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Out for Delivery</div>
                          <div className="text-sm text-muted-foreground">Package is out for delivery today</div>
                          <div className="text-xs text-muted-foreground mt-1">Today</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 opacity-50">
                        <div className="p-2 rounded-full bg-muted text-muted-foreground">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Delivered</div>
                          <div className="text-sm text-muted-foreground">Package has been delivered</div>
                          <div className="text-xs text-muted-foreground mt-1">Pending</div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-semibold text-foreground">Origin</div>
                          <div className="text-muted-foreground">Kathmandu, Nepal</div>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">Destination</div>
                          <div className="text-muted-foreground">New York, USA</div>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">Service Type</div>
                          <div className="text-muted-foreground">Express Air Freight</div>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">Weight</div>
                          <div className="text-muted-foreground">15.5 kg</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-['Poppins']">Need Help with Tracking?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              If you're having trouble tracking your shipment or need additional information, our support team is here
              to help 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href="/contact">Contact Support</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:+97712345678">Call Us: +977 1 234 5678</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tracking;
