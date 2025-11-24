import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Users, Calendar, Wrench, Lightbulb } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Active Members", value: "150+" },
    { icon: Calendar, label: "Events Hosted", value: "40+" },
    { icon: Wrench, label: "Workshops Conducted", value: "25+" },
    { icon: Lightbulb, label: "Projects Built", value: "30+" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="About Wiztron"
          subtitle="Empowering students to innovate with hardware and IoT technologies"
        />

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl border border-border bg-card"
          >
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To create a platform where students can explore, learn, and innovate in the fields
              of hardware development, Internet of Things, robotics, and embedded systems. We
              strive to bridge the gap between theoretical knowledge and practical implementation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl border border-border bg-card"
          >
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the leading student-driven hardware and IoT innovation hub, fostering a
              community of makers and problem-solvers who leverage technology to create meaningful
              solutions for real-world challenges.
            </p>
          </motion.div>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">What We Do</h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-8 rounded-xl border border-border bg-card"
          >
            <p className="text-muted-foreground leading-relaxed mb-4">
              Wiztron is the premier hardware and IoT club dedicated to nurturing innovation and
              technical excellence. We organize hands-on workshops, hackathons, and project
              showcases focused on:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Internet of Things (IoT) applications and smart systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Robotics and autonomous systems development</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Embedded systems programming with Arduino, ESP32, and Raspberry Pi</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Smart home automation and sensor integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Collaborative innovation and open-source hardware projects</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Statistics */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">Our Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg tech-gradient flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
