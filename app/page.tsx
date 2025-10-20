import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import { getAllPosts } from '@/lib/blog'

export default function Home() {
  const posts = getAllPosts()

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Blog posts={posts} />
      <Contact />
    </>
  )
}
