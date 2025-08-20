
import { motion } from "framer-motion";
import AboutHero from "../components/AboutHero";
import MissionVision from "../components/MissionVission";
import AboutUs from "../components/AboutUs";
import WhyChooseUs from "../components/WhyChooseUsAbout";
import Achievements from "../components/Achievement";
import DirectorMessage from "../components/DirectorMessage";
import CertificationsSection from "../components/CertificationsSection";
import CallToAction from "../components/CallToAction";
import AwardsRecognition from "../components/AwardAndRecognition";


function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <AboutHero />
      <AboutUs/>
      <MissionVision/>
      <WhyChooseUs/>
      <Achievements/>
      <DirectorMessage/>
      <AwardsRecognition/>
      <CertificationsSection/>
      <CallToAction/>
    </motion.div>
  );
}

export default About;
