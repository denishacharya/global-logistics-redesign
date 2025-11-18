import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { Cookie } from "lucide-react";

const CookiePolicy = () => {
  return (
    <>
      <SEOHead
        title="Cookie Policy - Team Global Logistics"
        description="Learn about how Team Global Logistics uses cookies on our website and how you can manage your cookie preferences."
        keywords="cookie policy, privacy, data protection, GDPR, CCPA"
      />

      <section className="relative min-h-[30vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Cookie className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-white/90">
            Last updated: March 18, 2025
          </p>
        </div>
      </section>

      <AnimatedSection className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
            They are widely used to make websites work more efficiently and provide information to website owners.
          </p>

          <h2>How We Use Cookies</h2>
          <p>
            Team Global Logistics uses cookies to enhance your browsing experience, analyze site traffic, and understand 
            where our visitors are coming from. We use the following types of cookies:
          </p>

          <h3>1. Necessary Cookies</h3>
          <p>
            These cookies are essential for the website to function properly. They enable core functionality such as 
            security, network management, and accessibility. These cookies cannot be disabled.
          </p>
          <ul>
            <li><strong>Session cookies:</strong> Temporary cookies that expire when you close your browser</li>
            <li><strong>Security cookies:</strong> Help protect your data and prevent fraudulent use</li>
            <li><strong>Cookie consent cookies:</strong> Remember your cookie preferences</li>
          </ul>

          <h3>2. Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting 
            information anonymously. We use this data to improve our website and services.
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Tracks page views, user behavior, and traffic sources</li>
            <li><strong>Performance metrics:</strong> Monitors page load times and technical performance</li>
          </ul>

          <h3>3. Marketing Cookies</h3>
          <p>
            These cookies track your online activity to help advertisers deliver more relevant advertising or to 
            limit how many times you see an ad. We may share this information with third parties for this purpose.
          </p>
          <ul>
            <li><strong>Advertising cookies:</strong> Used to show relevant ads on other websites</li>
            <li><strong>Social media cookies:</strong> Enable sharing content on social platforms</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may use various third-party cookies to report usage statistics, 
            deliver advertisements, and provide social media features. These include:
          </p>
          <ul>
            <li>Google Analytics for website analytics</li>
            <li>Google Maps for location services</li>
            <li>Social media platforms (Facebook, LinkedIn, Twitter) for social sharing features</li>
          </ul>

          <h2>Managing Your Cookie Preferences</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences 
            by clicking on the cookie settings button on our website or by adjusting your browser settings.
          </p>

          <h3>Browser Settings</h3>
          <p>
            Most web browsers allow you to control cookies through their settings. However, if you limit the ability 
            of websites to set cookies, you may worsen your overall user experience.
          </p>

          <h3>Opt-Out Links</h3>
          <ul>
            <li>
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Analytics Opt-out Browser Add-on
              </a>
            </li>
            <li>
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Digital Advertising Alliance Opt-out
              </a>
            </li>
          </ul>

          <h2>Cookie Duration</h2>
          <p>
            Cookies may be "persistent" or "session" cookies:
          </p>
          <ul>
            <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
            <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until you delete them</li>
          </ul>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes to our practices or for other 
            operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> info@teamgloballogistics.com</li>
            <li><strong>Phone:</strong> +977-1-XXXXXXX</li>
            <li><strong>Address:</strong> Kathmandu, Nepal</li>
          </ul>

          <h2>Compliance</h2>
          <p>
            This Cookie Policy complies with:
          </p>
          <ul>
            <li>General Data Protection Regulation (GDPR)</li>
            <li>California Consumer Privacy Act (CCPA)</li>
            <li>ePrivacy Directive</li>
          </ul>
        </div>
      </AnimatedSection>
    </>
  );
};

export default CookiePolicy;
