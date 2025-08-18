import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import ConsultationForm from "../components/ConsultationForm";
import SpecialistsSection from "../components/SpecialistsSection";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection/>
      
      <ConsultationForm/>
      <SpecialistsSection/>
      <Footer/>
    </div>
  );
}

export default Home;
