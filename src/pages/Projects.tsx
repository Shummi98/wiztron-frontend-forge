import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "Smart Campus System",
      description: "IoT-based attendance and resource management system for campus facilities",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      github: "https://github.com",
      leader: "Rahul Kumar",
    },
    {
      title: "Autonomous Line Follower",
      description: "Self-navigating robot using IR sensors and PID control algorithm",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      leader: "Priya Singh",
    },
    {
      title: "Weather Monitoring Station",
      description: "Real-time environmental data collection with ESP32 and cloud dashboard",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696",
      github: "https://github.com",
      leader: "Amit Sharma",
    },
    {
      title: "Smart Irrigation System",
      description: "Automated plant watering based on soil moisture and weather forecasts",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8",
      leader: "Sneha Patel",
    },
    {
      title: "RFID Access Control",
      description: "Secure door lock system with RFID authentication and logging",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f",
      github: "https://github.com",
      leader: "Vikram Reddy",
    },
    {
      title: "Voice-Controlled Home",
      description: "Smart home automation using voice commands and Google Assistant integration",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
      leader: "Neha Gupta",
    },
    {
      title: "Health Monitor Wearable",
      description: "Wearable device tracking heart rate, temperature, and activity levels",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
      github: "https://github.com",
      leader: "Arjun Mehta",
    },
    {
      title: "Traffic Light Controller",
      description: "Adaptive traffic management system using computer vision",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd",
      leader: "Kavya Iyer",
    },
    {
      title: "Fire Detection System",
      description: "Early fire detection using temperature, smoke, and gas sensors with alerts",
      image: "https://images.unsplash.com/photo-1614029951470-ef9eb9952be8",
      github: "https://github.com",
      leader: "Rohan Joshi",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Projects"
          subtitle="Innovative hardware and IoT solutions built by our members"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
