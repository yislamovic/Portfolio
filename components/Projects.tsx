'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    title: 'Jungle',
    description: 'A full-featured e-commerce application built with Rails 6.1. Features include product management, shopping cart, Stripe payment integration, admin authentication, and comprehensive image handling with CarrierWave. Upgraded from Rails 4.2 with modern Ruby 3.1.7 compatibility.',
    technologies: ['Rails', 'Ruby', 'PostgreSQL', 'Stripe', 'Bootstrap'],
    githubUrl: 'https://github.com/yislamovic/jungle',
    // liveUrl will be added after VPS deployment
  },
  {
    title: 'TinyApp',
    description: 'A sophisticated URL shortening service featuring advanced analytics, QR code generation, and a modern dark-themed interface. Includes real-time click tracking, performance charts, secure user authentication with bcrypt, and comprehensive API endpoints for URL management.',
    technologies: ['Node.js', 'Express', 'EJS', 'Bootstrap', 'Chart.js'],
    githubUrl: 'https://github.com/yislamovic/tinyapp',
    // liveUrl will be added after VPS deployment
  },
  {
    title: 'Interview Scheduler',
    description: 'A modern single-page React application for booking and managing interviews. Features real-time updates, component-based architecture with custom hooks, comprehensive testing with Jest and Cypress, and a professional dark-themed UI with form validation.',
    technologies: ['React', 'Express', 'Axios', 'Storybook', 'Jest'],
    githubUrl: 'https://github.com/yislamovic/scheduler',
    // liveUrl will be added after VPS deployment
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="h-full p-6 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border hover:shadow-xl transition-all duration-300 flex flex-col">
                  {/* Project Title */}
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-light-border dark:border-dark-border">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <FiGithub className="w-5 h-5" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        <FiExternalLink className="w-5 h-5" />
                        <span className="text-sm font-medium">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
