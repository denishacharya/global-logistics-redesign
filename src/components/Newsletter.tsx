import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center"
      >
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">You're all set!</h3>
        <p className="text-muted-foreground">
          Check your inbox for the latest updates on logistics solutions.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg p-8 border border-border">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-bold">Stay Updated</h3>
          </div>
          <p className="text-muted-foreground">
            Subscribe to our newsletter for the latest logistics insights, 
            industry news, and exclusive offers.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-[250px]"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
};
