
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 5000, suffix: "+", label: "Successful Surgeries" },
  { value: 98, suffix: "%", label: "Success Rate" },
  { value: 15, suffix: "+", label: "Specialist Doctors" },
  { value: 24, suffix: "/7", label: "Emergency Support" },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

const AnimatedStat = ({ value, suffix, label, restart }) => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    let start = 1;
    let end = value;
    let duration = 2.5; // slower animation
    let frame = 0;
    let totalFrames = Math.round(duration * 60);
    let increment = (end - start) / totalFrames;
    let raf;
    function animate() {
      frame++;
      let current = Math.round(start + increment * frame);
      if (current > end) current = end;
      setCount(current);
      if (frame < totalFrames) raf = requestAnimationFrame(animate);
    }
    setCount(1);
    frame = 0;
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, restart]);
  return (
    <motion.div
      whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-white/10 rounded-2xl shadow-lg p-8 flex flex-col items-center cursor-pointer select-none"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-white">
        {count}
        <span className="text-xl font-semibold">{suffix}</span>
      </h3>
      <p className="mt-2 text-sm text-white/90">{label}</p>
    </motion.div>
  );
};

const Achievements = () => {
  const sectionRef = useRef();
  const inView = useInView(sectionRef);
  const [restart, setRestart] = useState(false);
  useEffect(() => {
    if (inView) setRestart(r => !r);
  }, [inView]);
  return (
    <div className="p-2 pb-5 bg-white">
      <section ref={sectionRef} className="py-16 px-6 md:px-20 bg-gradient-to-r from-red-700 to-blue-700 text-white rounded-2xl shadow-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Achievements Speak for Themselves
          </h2>
          <p className="text-gray-200 mt-2">
            Numbers that reflect our commitment to excellence
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <div key={index} onMouseEnter={() => setRestart(r => !r)}>
              <AnimatedStat {...item} restart={restart} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Achievements;
