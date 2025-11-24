import SectionTitle from "@/components/SectionTitle";
import TeamCard from "@/components/TeamCard";

const Team = () => {
  const leadership = [
    {
      name: "Aditya Verma",
      role: "President",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Shreya Kapoor",
      role: "Vice President",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      linkedin: "https://linkedin.com",
    },
  ];

  const technicalTeam = [
    {
      name: "Karan Singh",
      role: "Technical Head",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Ananya Desai",
      role: "IoT Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Rahul Khanna",
      role: "Robotics Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Priyanka Sharma",
      role: "Embedded Systems Lead",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      linkedin: "https://linkedin.com",
    },
  ];

  const eventTeam = [
    {
      name: "Aryan Patel",
      role: "Event Coordinator",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Divya Menon",
      role: "Workshop Manager",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Rohit Kumar",
      role: "Logistics Head",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef",
      linkedin: "https://linkedin.com",
    },
  ];

  const mediaTeam = [
    {
      name: "Sakshi Agarwal",
      role: "Media Head",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Varun Reddy",
      role: "Content Writer",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Ishita Shah",
      role: "Design Lead",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      linkedin: "https://linkedin.com",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Team"
          subtitle="Meet the passionate innovators behind Wiztron"
        />

        {/* Leadership */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {leadership.map((member, index) => (
              <TeamCard key={index} {...member} index={index} />
            ))}
          </div>
        </div>

        {/* Technical Team */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Technical Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalTeam.map((member, index) => (
              <TeamCard key={index} {...member} index={index} />
            ))}
          </div>
        </div>

        {/* Event Management */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Event Management Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {eventTeam.map((member, index) => (
              <TeamCard key={index} {...member} index={index} />
            ))}
          </div>
        </div>

        {/* Media & Design */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">Media & Design Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {mediaTeam.map((member, index) => (
              <TeamCard key={index} {...member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
