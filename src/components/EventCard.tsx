import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
  image?: string;
  isPast?: boolean;
  index?: number;
}

const EventCard = ({
  title,
  date,
  time,
  venue,
  description,
  image,
  isPast = false,
  index = 0,
}: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
        {image && (
          <div className="h-48 overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <CardHeader>
          <h3 className="text-xl font-bold">{title}</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>{time}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{venue}</span>
            </div>
          </div>
        </CardContent>
        {!isPast && (
          <CardFooter>
            <Button className="w-full tech-gradient border-0">Register Now</Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default EventCard;
