import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FloatingJoinButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <Button
        asChild
        size="lg"
        className="tech-gradient border-0 shadow-lg tech-glow rounded-full px-6"
      >
        <Link to="/membership">
          <UserPlus className="h-5 w-5 mr-2" />
          Join Club
        </Link>
      </Button>
    </motion.div>
  );
};

export default FloatingJoinButton;
