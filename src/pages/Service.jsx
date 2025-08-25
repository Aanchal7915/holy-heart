

import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import ServiceHero from "../components/ServiceHero";
import WhyChooseUs from "../components/WhyChooseUs";
import FreeConsultation from "../components/FreeConsultation";
import services from "../data/services";




function Service() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
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
                        index={idx}
                    />
                ))}
            </div>
            <WhyChooseUs />
            <FreeConsultation />
        </motion.div>
    );
}

export default Service;

