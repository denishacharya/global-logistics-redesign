import { NavLink } from "@/components/NavLink";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ExternalLink } from "lucide-react";
import logo from "@/assets/team-global-logo.jpeg";
import { Newsletter } from "./Newsletter";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12">
        <Newsletter />
      </div>
      
      <div className="container mx-auto px-4 py-12 border-t border-primary-foreground/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src={logo} alt="Team Global Logistics" className="h-12 w-auto mb-4" />
            <p className="text-primary-foreground/80 mb-4">
              Your trusted partner for worldwide shipping and freight solutions. Fast, reliable, and secure.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors hover:scale-110 transform"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors hover:scale-110 transform"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors hover:scale-110 transform"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 font-['Poppins']">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/cookie-policy" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Cookie Policy
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 font-['Poppins']">Our Services</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Air Freight</li>
              <li>Ocean Freight</li>
              <li>Road Transport</li>
              <li>Warehousing</li>
              <li>Customs Clearance</li>
            </ul>
            
            {/* India Partner */}
            <div className="mt-6 pt-4 border-t border-primary-foreground/20">
              <h4 className="font-semibold text-sm mb-2 font-['Poppins']">India Partner</h4>
              <a 
                href="https://jayeshlogistics.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Jayesh Logistics <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 font-['Poppins']">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/80">123 Logistics Street, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/80">+977 1 234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/80">info@teamglobal.com.np</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Team Global Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
