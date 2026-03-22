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
      className="relative min-h-screen px-6 md:px-16 py-28 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{
             duration: 0.8,
             ease: [0.22, 1, 0.36, 1],
           }}
           className="relative z-10 grid lg:grid-cols-2 gap-20 p-8 md:p-12 bg-white rounded-[48px] border border-slate-200 shadow-2xl"
        >
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 tracking-tight leading-tight">
              Let’s Build Something <br /> <span className="text-rose-500">Meaningful</span>
            </h2>

            <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-sm">
              Whether it's a collaboration, internship opportunity,
              or just a conversation about building better web experiences —
              I’d love to connect.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-600 font-bold group">
                <div className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full border border-slate-200 group-hover:bg-rose-500/10 transition-colors">
                  <HiOutlineMail className="text-xl group-hover:text-rose-500 transition-colors" />
                </div>
                <a
                  href="mailto:yatish0155@gmail.com"
                  className="hover:text-rose-500 transition-colors"
                >
                  yatish0155@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4 text-slate-600 font-bold group">
                <div className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full border border-slate-200 group-hover:bg-rose-500/10 transition-colors">
                  <span className="text-lg group-hover:text-rose-500 transition-colors">📞</span>
                </div>
                <a
                  href="tel:+919812101423"
                  className="hover:text-rose-500 transition-colors"
                >
                  +91-9812101423
                </a>
              </div>
            </div>

            <div className="flex gap-5 mt-10">
              {[
                { icon: <FaGithub />, link: "https://github.com/yatishydv" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/yatishydv" },
                { icon: <FaInstagram />, link: "https://instagram.com/yatishydv" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-2xl border border-slate-200 text-slate-500 hover:text-white hover:bg-rose-500 hover:border-rose-500 transition-all font-bold"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <form onSubmit={sendEmail} className="space-y-6">
            <div>
              <input
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white rounded-2xl p-4 text-slate-900 focus:outline-none transition-all placeholder:text-slate-400 font-medium font-bold"
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
                className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white rounded-2xl p-4 text-slate-900 focus:outline-none transition-all placeholder:text-slate-400 font-medium font-bold"
              />
            </div>

            <div>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can I help?"
                required
                className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white rounded-2xl p-4 text-slate-900 focus:outline-none transition-all placeholder:text-slate-400 font-medium resize-none font-bold"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[15px] font-black tracking-widest uppercase hover:bg-rose-500 transition-all shadow-xl"
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