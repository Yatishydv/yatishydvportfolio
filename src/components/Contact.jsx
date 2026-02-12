import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function Contact() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_42hlb9v",
        "template_nrt0f1b",
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
        },
        "qxigPEflL12wSx5va"
      )
      .then(() => {
        alert("Message sent successfully 🚀");
        setFormData({
          from_name: "",
          from_email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Something went wrong ❌");
      });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen px-6 md:px-16 py-28 bg-[#f5f5f5] scroll-mt-40"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid lg:grid-cols-2 gap-20"
        >
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Let’s Build Something Meaningful
            </h2>

            <p className="text-gray-600 leading-7 mb-10 max-w-md">
              Whether it's a collaboration, internship opportunity,
              or just a conversation about building better web experiences —
              I’d love to connect.
            </p>

            <div className="flex items-center gap-3 mb-6 text-gray-800">
              <HiOutlineMail />
              <a
                href="mailto:yatish0155@gmail.com"
                className="hover:underline"
              >
                yatish0155@gmail.com
              </a>
            </div>

            <div className="flex gap-6 text-xl text-gray-700 mt-6">
              <a href="https://github.com/yatishydv" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/yatishydv" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://instagram.com/yatishydv" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <form onSubmit={sendEmail} className="space-y-10">
            <div>
              <input
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full bg-transparent border-b border-gray-400
                           focus:outline-none focus:border-black
                           pb-3 text-gray-800"
              />
            </div>

            <div>
              <input
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full bg-transparent border-b border-gray-400
                           focus:outline-none focus:border-black
                           pb-3 text-gray-800"
              />
            </div>

            <div>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full bg-transparent border-b border-gray-400
                           focus:outline-none focus:border-black
                           pb-3 text-gray-800 resize-none"
              />
            </div>

            {/* NAVBAR STYLE BUTTON */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="px-8 py-3 bg-black text-white rounded-full text-sm tracking-wide font-normal shadow-md hover:shadow-lg transition-all duration-300"
            >
              Send Message
            </motion.button>

          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;