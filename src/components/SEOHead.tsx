import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const SEOHead = ({ title, description, keywords, ogImage }: SEOProps) => {
  const location = useLocation();
  const baseUrl = "https://teamgloballogistics.com";
  const currentUrl = `${baseUrl}${location.pathname}`;
  const defaultImage = `${baseUrl}/og-image.jpg`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:image", ogImage || defaultImage, true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage || defaultImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);
  }, [title, description, keywords, ogImage, currentUrl]);

  return null;
};

export default SEOHead;

// Schema.org structured data helpers
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Team Global Logistics",
    "description": "Leading cargo and logistics company in Nepal providing air freight, sea freight, and road transport services",
    "url": "https://teamgloballogistics.com",
    "logo": "https://teamgloballogistics.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Nepal",
      "addressLocality": "Kathmandu"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+977-1-XXXXXXX",
      "contactType": "Customer Service",
      "email": "info@teamgloballogistics.com"
    },
    "sameAs": [
      "https://facebook.com/teamgloballogistics",
      "https://linkedin.com/company/teamgloballogistics"
    ]
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = "organization-schema";
    
    const existing = document.getElementById("organization-schema");
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("organization-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, []);

  return null;
};

export const FAQSchema = ({ faqs }: { faqs: Array<{ question: string; answer: string }> }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = "faq-schema";
    
    const existing = document.getElementById("faq-schema");
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById("faq-schema");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [faqs]);

  return null;
};
