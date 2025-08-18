import ServiceCard from "../components/ServiceCard";
import ServiceHero from "../components/ServiceHero";
import WhyChooseUs from "../components/WhyChooseUs";
import FreeConsultation from "../components/FreeConsultation";

function Home() {
    return (
        <>
            <ServiceHero />
            <ServiceCard />
            <WhyChooseUs />
            <FreeConsultation />
        </>
    );
}

export default Home;
