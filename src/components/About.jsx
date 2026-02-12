import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="relative min-h-screen px-6 md:px-16 py-28 bg-[#f3f3f3] overflow-hidden">

      <div className="relative max-w-7xl mx-auto">

        {/* Background ABOUT */}
        <h1
          className="absolute
                     text-[90px] sm:text-[130px] md:text-[160px] lg:text-[200px]
                     font-black
                     bg-gradient-to-b from-gray-300 to-transparent
                     bg-clip-text text-transparent
                     
                     /* 👇 Mobile thoda upar */
                     top-6 sm:top-16 md:top-0
                     
                     left-0
                     md:-left-8 lg:-left-14
                     
                     pointer-events-none">
          ABOUT
        </h1>

        {/* Content */}
        <div className="relative z-10 grid md:grid-cols-2 gap-20 pt-24">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
              Crafting Experiences <br />
              Beyond Just Code.
            </h2>

            <p
              className="text-gray-600 text-[17px] md:text-[18px]
                         leading-8 md:leading-9
                         font-serif max-w-xl">
              I'm a 3rd year Computer Science student focused on becoming a
              full-stack engineer through the MERN ecosystem. While frontend is
              currently my strongest edge, I intentionally build complete systems
              — from responsive interfaces to structured backend architecture.
              <br /><br />
              I care deeply about clean UI, smooth animations, scalable structure
              and performance-driven design. For me, development isn't just writing
              code — it's engineering experiences that feel intentional, polished
              and efficient.
            </p>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-2">Frontend</h3>
              <p className="text-sm text-gray-500">
                React · Next.js · Tailwind · Framer Motion
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-2">Backend</h3>
              <p className="text-sm text-gray-500">
                Node.js · Express · MongoDB · Firebase
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-2">Strength</h3>
              <p className="text-sm text-gray-500">
                Clean UI · Animation Focus · Performance
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-2">Mindset</h3>
              <p className="text-sm text-gray-500">
                Structured Thinking · Fast Learning · Discipline
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;