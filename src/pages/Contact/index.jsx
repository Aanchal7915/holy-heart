

import { motion } from "framer-motion";
import ContactFormSection from "./components/ContactForm";
import ContactHero from "./components/ContactHero";
import MapView from "./components/MapView";


export default function Contact() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <ContactHero />
            <ContactFormSection />
            <MapView />
        </motion.div>
    );
}