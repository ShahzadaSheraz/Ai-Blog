/**
 * One-time migration: adds author, tags, coverImage, featured, and canonical categories.
 * Run: node scripts/frontmatter-migrate.cjs
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDir = path.join(__dirname, "..", "content", "posts");

const covers = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1400&q=80",
];

const bySlug = {
  "freelance-writing-with-ai-boundaries-that-pay": {
    category: "Productivity Tools",
    tags: ["freelancing", "AI writing", "client work"],
    featured: true,
  },
  "privacy-security-when-using-student-ai-tools": {
    category: "Tech News",
    tags: ["privacy", "security", "students"],
  },
  "grammarly-and-ai-editing-for-student-writers": {
    category: "Data Science",
    tags: ["editing", "NLP", "writing quality"],
  },
  "translation-subtitling-and-remote-gigs-with-ai": {
    category: "Tech News",
    tags: ["localization", "remote work", "media"],
  },
  "academic-integrity-when-your-school-allows-ai": {
    category: "Tech News",
    tags: ["policy", "academic integrity", "schools"],
  },
  "ai-tutors-human-mentors-hybrid-study": {
    category: "AI & Machine Learning",
    tags: ["tutoring", "mentorship", "study systems"],
    featured: true,
  },
  "smart-note-taking-with-ai-notion-and-otter": {
    category: "Study Tips",
    tags: ["notes", "Notion", "capture"],
  },
  "online-portfolio-sites-with-ai-and-no-code-tools": {
    category: "Programming",
    tags: ["no-code", "portfolio", "shipping"],
  },
  "free-ai-stack-for-daily-homework": {
    category: "AI & Machine Learning",
    tags: ["tooling", "homework", "starter stack"],
    featured: true,
  },
  "youtube-scripts-and-ai-workflows-for-creators": {
    category: "Productivity Tools",
    tags: ["YouTube", "scripts", "creators"],
  },
  "prompt-literacy-for-students-and-earners": {
    category: "AI & Machine Learning",
    tags: ["prompting", "literacy", "workflows"],
    featured: true,
  },
  "ai-coding-assistants-for-self-taught-learners": {
    category: "Programming",
    tags: ["Copilot", "debugging", "self-taught"],
    featured: true,
  },
  "ai-writing-assistants-for-essays-and-research": {
    category: "Data Science",
    tags: ["research", "essays", "citations"],
  },
  "ethical-exam-prep-with-ai-support": {
    category: "Study Tips",
    tags: ["exams", "ethics", "prep"],
  },
  "durable-skills-online-earners-should-build": {
    category: "Productivity Tools",
    tags: ["career", "skills", "online work"],
  },
  "ai-language-learning-tools-that-actually-help": {
    category: "AI & Machine Learning",
    tags: ["language learning", "apps", "practice"],
  },
  "digital-products-with-ai-from-idea-to-launch": {
    category: "Productivity Tools",
    tags: ["products", "launch", "monetization"],
  },
  "ai-design-tools-for-beginner-side-hustles": {
    category: "Programming",
    tags: ["design", "side hustles", "visuals"],
  },
  "chatgpt-study-plans-for-complete-beginners": {
    category: "Study Tips",
    tags: ["ChatGPT", "study plans", "beginners"],
    featured: true,
  },
  "virtual-assistant-skills-augmented-by-ai": {
    category: "Productivity Tools",
    tags: ["VA", "automation", "clients"],
  },
};

let i = 0;
for (const file of fs.readdirSync(postsDir)) {
  if (!file.endsWith(".md")) continue;
  const slug = file.replace(/\.md$/, "");
  const full = path.join(postsDir, file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const meta = bySlug[slug];
  if (!meta) {
    console.warn("No mapping for", slug);
    continue;
  }
  const coverImage = covers[i % covers.length];
  i++;

  const nextData = {
    ...data,
    category: meta.category,
    tags: meta.tags,
    author: "Editorial Team",
    coverImage,
    featured: Boolean(meta.featured),
  };
  delete nextData.keywords;

  const out = matter.stringify(content, nextData, { lineWidth: 120 });
  fs.writeFileSync(full, out, "utf8");
  console.log("Updated", file);
}

console.log("Done.");
