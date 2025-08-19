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
    <>
      <AboutHero />
      <AboutUs/>
      <MissionVision/>
      <WhyChooseUs/>
      <Achievements/>
      <DirectorMessage/>
      <AwardsRecognition/>
      <CertificationsSection/>
      <CallToAction/>
    </>
  );
}

export default About;
