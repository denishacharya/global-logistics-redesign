import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <Truck className="h-8 w-8" />
            <span className="hidden sm:inline font-['Poppins']">Team Global Logistics</span>
            <span className="sm:hidden font-['Poppins']">TGL</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="text-foreground hover:text-primary transition-colors font-medium"
                activeClassName="text-primary font-semibold"
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild className="bg-accent hover:bg-accent/90">
              <NavLink to="/contact">Get Quote</NavLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-secondary"
                  activeClassName="text-primary bg-secondary font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Button asChild className="bg-accent hover:bg-accent/90 w-full">
                <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                  Get Quote
                </NavLink>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
