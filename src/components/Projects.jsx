import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

function Projects() {
  const projects = [
    {
      title: "Blink — Real-Time Video Chat Platform",
      description:
        "A privacy-first random video chat application built with WebRTC and Socket.IO. Features real-time peer-to-peer communication, anonymous matchmaking, connection timers and fully responsive UI.",
      tech: ["WebRTC", "Node.js", "Express", "Socket.IO", "JavaScript"],
      github: "#",
      live: "#",
    },
    {
      title: "Foodzy — AI-Powered Food Ordering Platform",
      description:
        "A modern full-stack food ordering platform powered by Firebase and Gemini AI. Includes authentication, order tracking, AI chatbot recommendations and 3D visuals using THREE.js.",
      tech: ["React", "Firebase", "Gemini API", "Tailwind", "THREE.js"],
      github: "#",
      live: "#",
    },
    {
      title: "Yatish Kumar — Interactive Developer Portfolio",
      description:
        "A carefully crafted personal portfolio showcasing real-world projects with refined UI systems, scroll animations, responsive layouts and integrated contact functionality.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "EmailJS"],
      github: "#",
      live: "#",
    },
    {
      title: "FreshMart — MERN Grocery Commerce System",
      description:
        "A comprehensive full-stack grocery e-commerce system featuring JWT authentication, admin dashboard, analytics, Razorpay integration and structured RESTful architecture.",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      github: "#",
      live: "#",
    },
    {
      title: "Tech Innovations Tracker — AI Trend Explorer",
      description:
        "A responsive web application that integrates Gemini API to dynamically generate and display emerging technology insights with structured content rendering.",
      tech: ["HTML", "CSS", "JavaScript", "Gemini API"],
      github: "#",
      live: "#",
    },
    {
      title: "ColabX — Governance & Innovation Platform",
      description:
        "A collaborative platform bridging government initiatives and entrepreneurial innovation through a structured multi-page responsive web experience.",
      tech: ["HTML", "CSS", "JavaScript", "PHP"],
      github: "#",
      live: "#",
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative px-6 md:px-16 py-28 bg-[#f5f5f5]"
    >
      <div className="max-w-7xl mx-auto relative">

        {/* Background Title */}
        <h1
          className="absolute text-[80px] md:text-[130px] lg:text-[170px]
                     font-black
                     bg-gradient-to-b from-gray-300 to-transparent
                     bg-clip-text text-transparent
                     -top-20 md:-top-28
                     left-0
                     pointer-events-none">
          PROJECTS
        </h1>

        <div className="relative z-10">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-20 tracking-tight"
          >
            Built With Curiosity
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-14"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                className="
                  bg-white
                  border border-gray-200
                  rounded-2xl
                  p-9
                  shadow-sm
                  hover:shadow-md
                  transition-shadow duration-300
                "
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-[15px] leading-7 mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="
                        text-xs px-3 py-1.5
                        bg-gray-100
                        border border-gray-200
                        rounded-full
                        text-gray-700
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-8 text-sm font-medium text-gray-900">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 group"
                  >
                    <FaGithub />
                    <span className="relative">
                      GitHub
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
                    </span>
                  </a>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 group"
                    >
                      <HiOutlineExternalLink />
                      <span className="relative">
                        Live
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
                      </span>
                    </a>
                  )}
                </div>

              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Projects;