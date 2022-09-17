import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";

function Slide({ data }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-300, 300])

  return (
    <section className="relative flex items-center justify-center h-[100vh] snap-center">
      <div ref={ref} className="absolute w-[300px]">
        {data.description}
      </div>
      <motion.h2
        style={{ y }}
        className="absolute left-[calc(50%+200px)] font-bold text-5xl mt-32"
      >
        {data.title}
      </motion.h2>
    </section>
  );
}

function Introduction() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {introductionItems.map((item,index) => (
        <Slide key={index} data={item} />
      ))}
      <motion.div className="fixed bottom-16 left-0 right-0 bg-white h-1" style={{ scaleX }} />
    </>
  );
}

export default Introduction

const introductionItems = [
  { title: 'Who we are', description: 'We at Olinco Multi Clean Systems specialize in residential and commercial cleaning, re-upholstery, and repair of office and home furniture. With over 15 years of experience and countless endorsements from our clients, Olinco is among the most trusted and reputable companies around.'},
  { title: 'Why we are', description: 'We provide services for shampooing, cleaning, and repairing all types of household and office furniture.'},
  { title: 'Our qualities', description: 'Free estimates Guaranteed quality work Great rates Professional and friendly team'},
  { title: 'Don’t be late', description: 'Call now'},
]