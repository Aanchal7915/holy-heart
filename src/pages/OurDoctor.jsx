
import { motion } from "framer-motion";
import OurDoctorHero from '../components/OurDoctorHero'
import DoctorsPage from '../components/DoctorCard';
import TeamCard from '../components/TeamCard'
import StatCard from '../components/StatCard'
import CertificationCard from '../components/CertificationCard';
import Consultation from '../components/ScheduleConsultation';


function OurDoctor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <OurDoctorHero/>
      <DoctorsPage/>
      <TeamCard/>
      <StatCard/>
      <CertificationCard/>
      <Consultation/>
    </motion.div>
  );
}

export default OurDoctor;
