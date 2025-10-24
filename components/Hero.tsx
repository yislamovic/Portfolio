'use client'

import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center section-padding pt-32">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-blue-600 dark:text-blue-400 font-medium text-lg">
              Hi, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
          >
            Yahya Islamovic
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl md:text-4xl font-semibold mb-6 text-gray-800 dark:text-gray-200"
          >
            Full Stack / Software Engineer
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
          >
            2.5 years of professional experience building enterprise software with the PERN stack.
            Specialized in full-stack development, cloud infrastructure, and delivering production systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg font-medium hover:bg-light-hover dark:hover:bg-dark-hover transition-colors duration-200"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-20"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="animate-bounce text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Scroll to about section"
            >
              <FiArrowDown className="w-6 h-6 mx-auto" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
