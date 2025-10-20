import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
import { FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi'
import 'highlight.js/styles/github-dark.css'

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Yahya Islamovic`,
    description: post.excerpt,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="container-width px-4">
        {/* Back Button */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <FiArrowLeft />
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                >
                  <FiTag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypeHighlight as any]],
              },
            }}
          />
        </div>

        {/* Back Button Bottom */}
        <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FiArrowLeft />
            Back to Blog
          </Link>
        </div>
      </article>
    </div>
  )
}
