'use client'

import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

const socialLinks = [
  {
    name: 'Email',
    icon: FiMail,
    href: 'mailto:yislamov@icloud.com',
    color: 'text-red-600 dark:text-red-400',
  },
  {
    name: 'GitHub',
    icon: FiGithub,
    href: 'https://github.com/yislamovic',
    color: 'text-gray-800 dark:text-gray-200',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    href: 'https://www.linkedin.com/in/yahya-islamovic',
    color: 'text-blue-600 dark:text-blue-400',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>

          {/* Contact Content */}
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-8"
            >
              I'm always open to discussing new projects, creative ideas, or opportunities
              to be part of your vision. Feel free to reach out!
            </motion.p>

            {/* Email CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-12"
            >
              <a
                href="mailto:yislamov@icloud.com"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Send Me an Email
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Or connect with me on social media
              </p>
              <div className="flex justify-center gap-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.2 }}
                    className={`p-4 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-200 ${link.color}`}
                    aria-label={link.name}
                  >
                    <link.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
