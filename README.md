# Yahya Islamovic - Portfolio Website

A modern, sleek portfolio website for Yahya Islamovic, Full Stack / Software Engineer. Built with Next.js 14, TypeScript, and TailwindCSS, featuring a blog system, dark/light mode, and Docker deployment support.

## Features

- **Modern Tech Stack**: Next.js 14, React 18, TypeScript
- **Responsive Design**: Beautiful on all devices
- **Dark/Light Mode**: Toggle theme with persistent preferences
- **MDX Blog System**: Write rich content with Markdown and React components
- **Smooth Animations**: Framer Motion for elegant transitions
- **Docker Ready**: Easy deployment to any VPS or cloud platform
- **SEO Optimized**: Meta tags and semantic HTML
- **Zero Database**: Static blog posts with MDX files

## Project Structure

```
Portfolio/
├── app/                      # Next.js app directory
│   ├── blog/[slug]/         # Dynamic blog post pages
│   │   └── page.tsx
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   └── ThemeProvider.tsx
├── lib/                     # Utility functions
│   └── blog.ts              # Blog post utilities
├── posts/                   # Blog posts (MDX files)
│   └── hello-world.mdx
├── scripts/                 # Helper scripts
│   └── new-post.js          # Create new blog posts
├── public/                  # Static assets
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose setup
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for containerized deployment)

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Blog Management

### Creating a New Post

Use the included script to create a new blog post:

```bash
npm run new-post
```

This will prompt you for:
- Post title
- Post excerpt (short description)
- Tags (comma-separated)

The script will automatically:
- Generate a slug from the title
- Create a new `.mdx` file in the `posts/` directory
- Add front matter with metadata
- Provide a template to get started

### Manual Post Creation

Create a new `.mdx` file in the `posts/` directory:

```markdown
---
title: "Your Post Title"
date: "2025-10-15"
excerpt: "A brief description of your post"
tags: ["Next.js", "React", "TypeScript"]
---

# Your Post Title

Your content here...
```

### Blog Post Features

- **Markdown Support**: Full Markdown syntax
- **Code Highlighting**: Syntax-highlighted code blocks
- **Front Matter**: Metadata for title, date, excerpt, and tags
- **MDX**: Use React components within your posts

Example code block:
```typescript
const greeting: string = "Hello, World!"
console.log(greeting)
```

## Docker Deployment

### Building the Docker Image

```bash
docker compose build
```

### Running with Docker Compose

```bash
docker compose up -d
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Stopping the Container

```bash
docker compose down
```

### Updating Blog Posts

The `posts/` directory is mounted as a volume in the Docker container. To update blog posts:

1. Add or edit `.mdx` files in the `posts/` directory
2. Restart the container:
   ```bash
   docker compose restart
   ```

## VPS Deployment

### Step-by-Step Guide

1. **Clone the repository on your VPS**:
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Build and run with Docker**:
   ```bash
   docker compose up -d --build
   ```

3. **Set up a reverse proxy** (nginx example):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable SSL with Let's Encrypt** (optional but recommended):
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

## Customization

### Personal Information

Update the following files with your information:

- **`app/layout.tsx`**: Update meta tags and title
- **`components/Hero.tsx`**: Update name and tagline
- **`components/About.tsx`**: Update bio and technologies
- **`components/Projects.tsx`**: Update projects array with your projects
- **`components/Contact.tsx`**: Update email and social links
- **`components/Footer.tsx`**: Update social links

### Styling

- **Colors**: Edit `tailwind.config.ts` for custom color schemes
- **Fonts**: Change fonts in `app/layout.tsx`
- **Animations**: Customize animations in `tailwind.config.ts` and component files

### Theme

The dark theme is set as default. To change the default:
- Edit `components/ThemeProvider.tsx`
- Change the initial theme state from `'dark'` to `'light'`

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

### Blog System
- **MDX**: Markdown with JSX support
- **next-mdx-remote**: Remote MDX rendering
- **gray-matter**: Front matter parsing

### Icons
- **react-icons**: Icon library (Feather Icons)
- **simple-icons**: Technology logos

### Deployment
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run new-post` - Create a new blog post

## Performance

- **Server-Side Rendering**: Fast initial page loads
- **Static Generation**: Blog posts pre-rendered at build time
- **Code Splitting**: Automatic code splitting by Next.js
- **Image Optimization**: Automatic image optimization
- **Minimal Bundle Size**: Tree-shaking and optimized builds

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Yahya Islamovic
- Email: yahya@example.com
- GitHub: [yahyaislamovic](https://github.com/yahyaislamovic)
- LinkedIn: [yahyaislamovic](https://linkedin.com/in/yahyaislamovic)

---

**Built with care by Yahya Islamovic**
