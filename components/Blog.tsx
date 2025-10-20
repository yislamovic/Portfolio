'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCalendar, FiTag } from 'react-icons/fi'
import { PostMetadata } from '@/lib/blog'

interface BlogProps {
  posts: PostMetadata[]
}

export default function Blog({ posts }: BlogProps) {
  return (
    <section id="blog" className="section-padding bg-light-surface dark:bg-dark-surface">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Latest <span className="text-gradient">Posts</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>

          {/* Blog Posts */}
          {posts.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No posts yet. Check back soon!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="h-full p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col cursor-pointer group">
                      {/* Post Title */}
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {post.title}
                      </h3>

                      {/* Post Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}</span>
                        </div>
                      </div>

                      {/* Excerpt */}
                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-light-border dark:border-dark-border">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                            >
                              <FiTag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More */}
                      <div className="mt-4">
                        <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
