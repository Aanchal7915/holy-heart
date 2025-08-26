
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const stats = [
  { value: 11, suffix: "+", label: "Years of Excellence" },
  { value: 10000, suffix: "+", label: "Patients Treated" },
  { value: 24, suffix: "/7", label: "Emergency Care" },
  { value: 100, suffix: "%", label: "Commitment" },
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

const StatCard = ({ value, suffix, label, restart }) => {
  const [count, setCount] = useState(1);
  const controls = useAnimation();

  useEffect(() => {
    let start = 1;
    let end = value;
    let duration = 1.2; // seconds
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
      className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center cursor-pointer select-none"
    >
      <h3 className="text-4xl md:text-5xl font-bold text-red-700">
        {count}
        <span className="text-2xl font-semibold">{suffix}</span>
      </h3>
      <p className="mt-2 text-lg text-gray-700 font-medium text-center">{label}</p>
    </motion.div>
  );
};

export default function StatisticsSection() {
  const sectionRef = useRef();
  const inView = useInView(sectionRef);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    if (inView) setRestart(r => !r);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 md:px-10"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-2">
          Our Achievements
        </h2>
        <p className="text-gray-600 text-center mb-8 text-lg">
          Proudly serving with excellence and commitment
        </p>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              onMouseEnter={() => setRestart(r => !r)}
            >
              <StatCard {...stat} restart={restart} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
