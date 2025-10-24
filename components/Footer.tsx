'use client'

import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border">
      <div className="container-width px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Yahya Islamovic. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/yislamovic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/yahya-islamovic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:yislamov@icloud.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Email"
            >
              <FiMail className="w-5 h-5" />
            </a>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors duration-200"
              aria-label="Scroll to top"
            >
              <FiArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
