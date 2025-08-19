import ServiceCard from "../components/ServiceCard";
import ServiceHero from "../components/ServiceHero";
import WhyChooseUs from "../components/WhyChooseUs";
import FreeConsultation from "../components/FreeConsultation";
const services = [
    {
        "title": "Transradial Angioplasty",
        "description": "Advanced angioplasty procedures with reduced access site complications. Patients can sit up and walk almost immediately with less overall discomfort.",
        "react-icon-name": "Heart",
        "image": "https://source.unsplash.com/400x300/?angioplasty,health",
        "list-text": [
            "Reduced bleeding complications",
            "Improved patient satisfaction",
            "Same-day discharge possible",
            "Cost-effective treatment approach"
        ]
    },
    {
        "title": "Pacemaker Implantation",
        "description": "Pacemaker implantation for patients with irregular heartbeats. Our surgical procedures help control abnormal heart rates and restore normal cardiac function.",
        "react-icon-name": "Heart",
        "image": "https://source.unsplash.com/400x300/?pacemaker,surgery",
        "list-text": [
            "Treatment for slow or irregular heartbeats",
            "Advanced pacemaker technology",
            "Quick recovery and return to normal activities",
            "Comprehensive post-operative care"
        ]
    },
    {
        "title": "Transradial Angiography",
        "description": "Angiography is a procedure used to identify narrowing or blockages in the arteries. Transradial access offers advantages over the transfemoral approach with minimal vascular complications and reduced bleeding risks.",
        "react-icon-name": "Heart",
        "image": "https://source.unsplash.com/400x300/?angiography,artery",
        "list-text": [
            "Safe and effective alternative to transfemoral methods",
            "Minimal vascular complication rate",
            "Earlier ambulation and improved patient comfort",
            "Reduced hospital costs and length of stay"
        ]
    },
    {
        "title": "Valvular Heart Disease",
        "description": "Comprehensive treatment for heart valve problems. Our expert team provides both medical management and surgical interventions for damaged or defective heart valves.",
        "react-icon-name": "Heart",
        "image": "https://source.unsplash.com/400x300/?heart,valve",
        "list-text": [
            "Treatment for all four heart valves",
            "Advanced valve repair and replacement",
            "Minimally invasive surgical options",
            "Long-term cardiac monitoring and care"
        ]
    },
    {
        "title": "24hrs Cardiac Backup & Fully Equipped ICCU",
        "description": "The Intensive Coronary Care Unit (ICCU) provides specialized medical and nursing care for patients requiring constant cardiac monitoring.",
        "react-icon-name": "Heart",
        "image": "https://source.unsplash.com/400x300/?hospital,icu",
        "list-text": [
            "24/7 emergency cardiac care",
            "Advanced monitoring equipment",
            "Specialized cardiac nursing staff",
            "Immediate intervention capabilities"
        ]
    },
    {
        "title": "Pediatric Cardiology",
        "description": "Specialized pediatric cardiology services focusing on improvement in all aspects of cardiovascular disease in children and prevention strategies.",
        "react-icon-name": "Heart",
        "image": "https://source.unsplash.com/400x300/?children,cardiology",
        "list-text": [
            "Comprehensive pediatric heart care",
            "Congenital heart defect treatment",
            "Child-friendly environment",
            "Family-centered care approach"
        ]
    }
]


function Home() {
    return (
        <>
            <ServiceHero />
            <div>
                {services.map((service, idx) => (
                    <ServiceCard
                        key={idx}
                        title={service.title}
                        description={service.description}
                        image={service.image}
                        reactIconName={service["react-icon-name"]}
                        listText={service["list-text"]}
                    />
                ))}
            </div>
            <WhyChooseUs />
            <FreeConsultation />
        </>
    );
}

export default Home;
