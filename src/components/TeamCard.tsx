import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  index?: number;
}

const TeamCard = ({ name, role, image, linkedin, index = 0 }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-64 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Linkedin className="h-5 w-5 text-primary-foreground" />
            </a>
          )}
        </div>
        <CardContent className="text-center py-6">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm">{role}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamCard;
