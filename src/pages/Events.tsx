import SectionTitle from "@/components/SectionTitle";
import EventCard from "@/components/EventCard";

const Events = () => {
  const upcomingEvents = [
    {
      title: "IoT Workshop - ESP32 Basics",
      date: "March 15, 2024",
      time: "2:00 PM - 5:00 PM",
      venue: "Lab A-101",
      description: "Learn the fundamentals of IoT development with ESP32 microcontrollers and various sensors.",
    },
    {
      title: "Robotics Competition 2024",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      venue: "Main Auditorium",
      description: "Build and compete with autonomous line-following and obstacle-avoidance robots.",
    },
    {
      title: "Tech Talk: Future of IoT",
      date: "April 5, 2024",
      time: "3:00 PM - 4:30 PM",
      venue: "Seminar Hall",
      description: "Industry experts discuss emerging trends in IoT, smart cities, and connected devices.",
    },
    {
      title: "Arduino Bootcamp",
      date: "April 12, 2024",
      time: "1:00 PM - 5:00 PM",
      venue: "Lab B-205",
      description: "Intensive hands-on session covering Arduino programming and project development.",
    },
  ];

  const pastEvents = [
    {
      title: "Smart Home Hackathon",
      date: "February 10, 2024",
      time: "9:00 AM - 6:00 PM",
      venue: "Innovation Lab",
      description: "24-hour hackathon where teams built innovative smart home automation solutions. Winner: Team AutoMate with their voice-controlled home system.",
      isPast: true,
    },
    {
      title: "PCB Design Workshop",
      date: "January 20, 2024",
      time: "2:00 PM - 5:00 PM",
      venue: "Lab C-302",
      description: "Comprehensive workshop on PCB design using KiCad and Eagle, from schematic to fabrication.",
      isPast: true,
    },
    {
      title: "Drone Building Session",
      date: "December 15, 2023",
      time: "11:00 AM - 4:00 PM",
      venue: "Outdoor Arena",
      description: "Hands-on drone assembly and flight training session with expert guidance.",
      isPast: true,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Events"
          subtitle="Join our workshops, competitions, and tech talks"
        />

        {/* Upcoming Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} index={index} />
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Past Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <EventCard key={index} {...event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
