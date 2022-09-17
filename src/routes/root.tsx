import { Outlet } from "react-router-dom";
import { motion, useScroll, useInView } from "framer-motion"
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import NavSvg from "../components/NavSvg";
import Introduction from "../components/Introduction";
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const navItems = [
  { name: 'Services', color: '#F59E0B' },
  { name: 'Our Projects', color: '#0EA5E9' },
  { name: 'Contact', color: '#22C55E' },
  { name: 'About', color: '#F43F5E' },
]

// const variants = {
//   fixed: { position: 'fixed', top: 10, left: 10 },
//   relative: { position: 'relative', x: 0, y: 0 },
// }


function Root() {
  const { scrollY } = useScroll()
  const [ progress, setProgress] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if(latest <= window.innerHeight) {
        setProgress(latest/window.innerHeight)
      }
    })
  }, [])

  useLayoutEffect(() => {
    if (navRef.current) {
      setDimensions({
        width: navRef.current.offsetWidth,
        height: navRef.current.offsetHeight
      });
      console.log(navRef.current.offsetWidth)
    }
  }, []);

  return (
    <div className="relative">
      <div className="h-[100vh] flex items-center justify-center snap-center">
        <motion.div
          ref={navRef}
          animate={{
            position: progress > 0 ? 'fixed' : 'relative',
            scale: 1 - progress/2,
            x: progress > 0 ? (-window.innerWidth/2 + dimensions.width/3) * progress : 0,
            y: progress > 0 ? (-window.innerHeight/2 + dimensions.height/3) * progress : 0,
            zIndex: 1
          }}
        >
          <motion.ul
            className="w-96 h-96 grid grid-rows-2 grid-cols-2 p-4 rounded-[50px] gap-3 bg-white/20"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                className="bg-white text-clrViolet rounded-full flex items-center justify-center"
                variants={itemVariant}
              >
                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{
                    scale: 1.1,
                    cursor: 'pointer',
                    color: item.color
                  }}
                >
                  <NavSvg name={item.name}/>
                  <span className="font-bold">{item.name}</span>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <Introduction />
    </div>
  )
}

export default Root