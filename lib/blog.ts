import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostMetadata {
  title: string
  date: string
  excerpt: string
  tags: string[]
  slug: string
}

export interface Post extends PostMetadata {
  content: string
}

// Get all post slugs
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.(mdx|md)$/, ''))
}

// Get post data by slug
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    // Try .mdx first, then .md
    let fileContents: string
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8')
    } else {
      const mdPath = path.join(postsDirectory, `${slug}.md`)
      if (fs.existsSync(mdPath)) {
        fileContents = fs.readFileSync(mdPath, 'utf8')
      } else {
        return null
      }
    }

    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Get all posts sorted by date
export function getAllPosts(): PostMetadata[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug)
      if (!post) return null

      const { content, ...metadata } = post
      return metadata
    })
    .filter((post): post is PostMetadata => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}
