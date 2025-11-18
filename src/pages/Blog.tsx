import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Logistics: AI and Automation in Supply Chain",
    excerpt: "Explore how artificial intelligence and automation are revolutionizing the logistics industry and what it means for global supply chains.",
    category: "Technology",
    date: "2025-03-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    author: "Sarah Johnson"
  },
  {
    id: "2",
    title: "Sustainable Logistics: Reducing Carbon Footprint in Shipping",
    excerpt: "Learn about the latest strategies and technologies helping logistics companies reduce their environmental impact.",
    category: "Sustainability",
    date: "2025-03-10",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800",
    author: "Michael Chen"
  },
  {
    id: "3",
    title: "Nepal's Growing Role in International Trade",
    excerpt: "An analysis of how Nepal is positioning itself as a key player in South Asian logistics and trade corridors.",
    category: "Industry Insights",
    date: "2025-03-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    author: "Priya Sharma"
  },
  {
    id: "4",
    title: "Air Freight vs Sea Freight: Choosing the Right Option",
    excerpt: "A comprehensive guide to help businesses decide between air and sea freight for their shipping needs.",
    category: "Guides",
    date: "2025-03-01",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800",
    author: "David Martinez"
  },
  {
    id: "5",
    title: "Supply Chain Resilience: Lessons from Recent Global Events",
    excerpt: "How businesses can build more resilient supply chains to withstand disruptions and uncertainties.",
    category: "Strategy",
    date: "2025-02-25",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=800",
    author: "Emily Thompson"
  },
  {
    id: "6",
    title: "Customs Clearance Made Easy: A Step-by-Step Guide",
    excerpt: "Navigate the complexities of customs clearance with our comprehensive guide for importers and exporters.",
    category: "Guides",
    date: "2025-02-20",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    author: "Robert Kim"
  }
];

const categories = ["All", "Technology", "Sustainability", "Industry Insights", "Guides", "Strategy"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="Blog - Team Global Logistics"
        description="Stay updated with the latest logistics insights, industry trends, and expert advice from Team Global Logistics. Read our blog for shipping tips and supply chain management strategies."
        keywords="logistics blog, shipping insights, supply chain management, Nepal logistics, cargo industry news"
      />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Logistics Insights
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Expert insights, industry trends, and practical guides for modern logistics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <AnimatedSection className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Posts Grid */}
      <AnimatedSection className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge>{post.category}</Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    By {post.author}
                  </span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="flex items-center gap-2 text-primary hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        )}
      </AnimatedSection>
    </>
  );
};

export default Blog;
