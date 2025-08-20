
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ConsultationForm from "../components/ConsultationForm";
import SpecialistsSection from "../components/SpecialistsSection";


function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Hero />
      <AboutSection />
      <SpecialistsSection />
      <ConsultationForm />
    </motion.div>
  );
}

export default Home;
