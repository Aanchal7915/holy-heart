import OurDoctorHero from '../components/OurDoctorHero'
import DoctorsPage from '../components/DoctorCard';
import TeamCard from '../components/TeamCard'
import StatCard from '../components/StatCard'
import CertificationCard from '../components/CertificationCard';
import Consultation from '../components/Consultation';

function OurDoctor() {
  return (
    <div>
      <OurDoctorHero/>
      <DoctorsPage/>
      <TeamCard/>
      <StatCard/>
      <CertificationCard/>
      <Consultation/>
    </div>
  );
}

export default OurDoctor;
