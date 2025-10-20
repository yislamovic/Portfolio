'use client'

import { motion } from 'framer-motion'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiGraphql,
  SiAmazon
} from 'react-icons/si'

const technologies = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-light-surface dark:bg-dark-surface">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I'm a Full Stack Software Engineer with a passion for creating elegant,
              efficient solutions to complex problems. With expertise spanning modern web
              technologies, cloud infrastructure, and software architecture, I bring ideas
              to life through clean, maintainable code.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether it's building responsive user interfaces, designing scalable backend
              systems, or optimizing application performance, I thrive on the challenge of
              crafting software that makes a real impact.
            </p>
          </motion.div>

          {/* Technologies */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8">
              Technologies & Tools
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-light-bg dark:bg-dark-bg hover:shadow-lg transition-all duration-200 group"
                >
                  <tech.icon
                    className="w-12 h-12 mb-2 transition-colors duration-200"
                    style={{ color: tech.color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 text-center">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
