import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Lightbulb, Trophy, Users } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import EventCard from "@/components/EventCard";

const Home = () => {
  const highlights = [
    {
      icon: Calendar,
      title: "Events",
      description: "Workshops, hackathons, and tech talks throughout the year",
    },
    {
      icon: Lightbulb,
      title: "Projects",
      description: "Innovative IoT and hardware projects built by our members",
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Awards and recognitions in national competitions",
    },
    {
      icon: Users,
      title: "Team",
      description: "Passionate innovators driving technological advancement",
    },
  ];

  const upcomingEvents = [
    {
      title: "IoT Workshop",
      date: "March 15, 2024",
      time: "2:00 PM - 5:00 PM",
      venue: "Lab A-101",
      description: "Learn basics of IoT with ESP32 and sensors",
    },
    {
      title: "Robotics Competition",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      venue: "Main Auditorium",
      description: "Build and compete with autonomous robots",
    },
    {
      title: "Tech Talk Series",
      date: "April 5, 2024",
      time: "3:00 PM - 4:30 PM",
      venue: "Seminar Hall",
      description: "Industry experts share insights on emerging technologies",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl tech-gradient flex items-center justify-center tech-glow">
                <span className="text-primary-foreground font-bold text-4xl">W</span>
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Wiztron – Hardware & IoT Club
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Where Innovation Sparks to Life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="tech-gradient border-0 text-lg px-8">
                <Link to="/membership">Join Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/events">Explore Events</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionTitle title="What We Offer" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg tech-gradient flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionTitle
              title="About Wiztron"
              subtitle="We are a community of hardware enthusiasts, IoT developers, and innovators passionate about building the future of connected technology."
            />
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Upcoming Events"
            subtitle="Join us for workshops, competitions, and tech talks"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} index={index} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
