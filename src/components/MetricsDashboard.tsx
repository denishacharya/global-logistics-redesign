import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, Globe, Clock } from "lucide-react";

const monthlyData = [
  { month: "Jan", shipments: 4200 },
  { month: "Feb", shipments: 4800 },
  { month: "Mar", shipments: 5200 },
  { month: "Apr", shipments: 5600 },
  { month: "May", shipments: 6100 },
  { month: "Jun", shipments: 6800 },
];

const deliveryData = [
  { name: "On-Time", value: 95, color: "hsl(var(--accent))" },
  { name: "Delayed", value: 5, color: "hsl(var(--destructive))" },
];

const cargoTypeData = [
  { type: "Air", count: 3500 },
  { type: "Sea", count: 4200 },
  { type: "Road", count: 2800 },
];

const COLORS = ["hsl(var(--accent))", "hsl(var(--destructive))"];

const MetricsDashboard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
            Performance Metrics
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time analytics showcasing our commitment to excellence
          </p>
        </motion.div>

        {/* Animated Counter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Shipments</p>
                    <div className="text-3xl font-bold text-foreground font-['Poppins']">
                      {inView && <CountUp end={50000} duration={2.5} separator="," />}+
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Package className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Countries Served</p>
                    <div className="text-3xl font-bold text-foreground font-['Poppins']">
                      {inView && <CountUp end={50} duration={2.5} />}+
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-accent/10 text-accent">
                    <Globe className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">On-Time Deliveries</p>
                    <div className="text-3xl font-bold text-foreground font-['Poppins']">
                      {inView && <CountUp end={99.9} duration={2.5} decimals={1} />}%
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-accent/10 text-accent">
                    <Clock className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Global Clients</p>
                    <div className="text-3xl font-bold text-foreground font-['Poppins']">
                      {inView && <CountUp end={10000} duration={2.5} separator="," />}+
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-['Poppins']">Monthly Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line type="monotone" dataKey="shipments" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-['Poppins']">On-Time vs Delayed</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={deliveryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deliveryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-['Poppins']">Cargo Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={cargoTypeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Bar dataKey="count" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MetricsDashboard;
