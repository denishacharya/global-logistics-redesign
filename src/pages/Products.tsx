import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { Search, Filter, Package, Globe, Award, FileText, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCategory } from "@/types/product";
import { Link } from "react-router-dom";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");

  const categories = [
    { value: "all" as ProductCategory, label: "All Products" },
    { value: "agricultural" as ProductCategory, label: "Agricultural" },
    { value: "textile" as ProductCategory, label: "Textile & Fabrics" },
    { value: "chemicals" as ProductCategory, label: "Chemicals" },
    { value: "machinery" as ProductCategory, label: "Machinery" },
    { value: "electronics" as ProductCategory, label: "Electronics" },
    { value: "consumer-goods" as ProductCategory, label: "Consumer Goods" },
  ];

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.hsCode.includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <SEOHead
        title="Product Catalog - Export Quality Products | Team Global Logistics"
        description="Browse our comprehensive product catalog featuring agricultural products, textiles, chemicals, machinery, and consumer goods. All products ready for international export with certifications and documentation."
        keywords="export products, international trade products, agricultural exports, textile products, industrial chemicals, machinery export, HS code products, certified products"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Product Catalog
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Premium export-quality products with complete documentation, certifications, and specifications. Ready for international markets.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span>Certified Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                <span>Complete Documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" />
                <span>Global Export Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/30 sticky top-16 z-40 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by product name, HS code, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className="whitespace-nowrap"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 0.1}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow group">
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-t-lg h-64">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-accent text-accent-foreground">
                          {product.category.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="w-4 h-4" />
                          <span>HS Code: {product.hsCode}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {product.description}
                      </p>

                      <Separator />

                      {/* Key Specifications */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Specifications:</h4>
                        <ul className="space-y-1 text-sm">
                          {product.specifications.slice(0, 3).map((spec, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span className="text-muted-foreground">{spec.label}:</span>
                              <span className="font-medium">{spec.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Export Details */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Export Info:</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-accent" />
                            <span className="text-muted-foreground">Origin:</span>
                            <span className="font-medium">{product.exportDetails.origin}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-accent" />
                            <span className="text-muted-foreground">MOQ:</span>
                            <span className="font-medium">{product.exportDetails.minOrderQuantity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Certifications:</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.exportDetails.certifications.map((cert, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Price Range:</div>
                        <div className="text-lg font-bold text-accent">
                          {product.price.currency} {product.price.amount}
                        </div>
                        <div className="text-xs text-muted-foreground">{product.price.unit}</div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link to="/inquiry">
                          Request Quote
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need a Custom Product or Bulk Order?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                We specialize in sourcing and exporting products tailored to your specific requirements. Get in touch for customized solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/inquiry">Request Custom Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Products;
