import AboutHero from "../components/AboutHero";
import MissionVision from "../components/MissionVission";
import AboutUs from "../components/AboutUs";
import WhyChooseUs from "../components/WhyChooseUsAbout";
import Achievements from "../components/Achievement";
import DirectorMessage from "../components/DirectorMessage";
import CertificationsPage from "../components/Certification";
import CallToAction from "../components/CallToAction";

function About() {
  return (
    <>
      <AboutHero />
      <AboutUs/>
      <MissionVision/>
      <WhyChooseUs/>
      <Achievements/>
      <DirectorMessage/>
      <CertificationsPage/>
      <CallToAction/>
    </>
  );
}

export default About;
