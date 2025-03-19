# 🌐 Retro Blog

A nostalgic personal blog website inspired by the classic 90s web aesthetic. Built with Astro and featuring multiple switchable retro themes.

## 🚀 Features

- Multiple retro themes (Windows 95, Mac OS 9, Web 1999)
- Classic 90s web elements:
  - Pixelated borders and beveled buttons
  - Text shadows and gradient backgrounds
  - "Under Construction" imagery
  - Marquee scrolling text
  - Visitor counter
  - Guestbook system
- Responsive design
- Blog post system
- Local storage for theme preferences and guestbook entries

## 🛠️ Tech Stack

- [Astro](https://astro.build/) - Static Site Generator
- Plain CSS (no frameworks)
- TypeScript
- Local Storage for data persistence

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone
   cd retro-blog
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:4321`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📝 Adding Blog Posts

1. Create a new `.astro` file in `src/pages/blog/`
2. Use the `BlogPost` layout component
3. Add your content using Markdown-style syntax

Example:

```astro
---
import BlogPost from '../../layouts/BlogPost.astro';
---

<BlogPost
  title="Your Post Title"
  pubDate="March 7, 2024"
>
  <h1>Your Content Here</h1>
  <p>Start writing your blog post...</p>
</BlogPost>
```

## 🎨 Themes

The site includes three retro themes:

- Windows 95 - Classic grey interface
- Mac OS 9 - Apple's platinum design
- Web 1999 - Bright, colorful web aesthetic

Themes are stored in local storage and can be switched using the theme switcher in the header.

## 📜 License

MIT License - feel free to use this for your own retro-inspired projects!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
