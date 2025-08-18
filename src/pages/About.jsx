import Navbar from "../components/Navbar";
import ContactHero from "../components/ContactHero";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <ContactHero />
      <ContactForm/>
      <Footer/>
    </div>
  );
}

export default Home;
