#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve))
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

async function createNewPost() {
  console.log('\n📝 Create a New Blog Post\n')

  try {
    // Get post details
    const title = await question('Post Title: ')
    if (!title) {
      console.error('❌ Title is required!')
      rl.close()
      return
    }

    const excerpt = await question('Post Excerpt (short description): ')
    if (!excerpt) {
      console.error('❌ Excerpt is required!')
      rl.close()
      return
    }

    const tagsInput = await question('Tags (comma-separated): ')
    const tags = tagsInput
      ? tagsInput.split(',').map((tag) => tag.trim())
      : []

    // Generate slug from title
    const slug = slugify(title)
    const date = new Date().toISOString().split('T')[0]

    // Create front matter
    const frontMatter = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
tags: [${tags.map((tag) => `"${tag}"`).join(', ')}]
---

# ${title}

Write your post content here. You can use Markdown and MDX formatting.

## Code Example

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`)
}

greet('World')
\`\`\`

## Features

- Markdown support
- Syntax highlighting for code blocks
- Images and media
- Custom components (with MDX)

## Conclusion

Your conclusion here...
`

    // Ensure posts directory exists
    const postsDir = path.join(process.cwd(), 'posts')
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true })
    }

    // Create the post file
    const filePath = path.join(postsDir, `${slug}.mdx`)

    if (fs.existsSync(filePath)) {
      const overwrite = await question(
        `⚠️  A post with this slug already exists. Overwrite? (y/N): `
      )
      if (overwrite.toLowerCase() !== 'y') {
        console.log('❌ Cancelled.')
        rl.close()
        return
      }
    }

    fs.writeFileSync(filePath, frontMatter)

    console.log(`\n✅ Post created successfully!`)
    console.log(`📄 File: ${filePath}`)
    console.log(`🔗 Slug: ${slug}`)
    console.log(`\n📝 Edit your post at: posts/${slug}.mdx`)
    console.log(`🌐 It will be available at: /blog/${slug}`)

    // Git workflow instructions
    console.log(`\n📦 Next steps:`)
    console.log(`   1. Edit posts/${slug}.mdx with your content`)
    console.log(`   2. git add posts/${slug}.mdx`)
    console.log(`   3. git commit -m "Add blog post: ${title}"`)
    console.log(`   4. git push`)
    console.log(`   5. Deploy: docker compose up -d --build\n`)
  } catch (error) {
    console.error('❌ Error creating post:', error.message)
  } finally {
    rl.close()
  }
}

createNewPost()
