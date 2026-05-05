export type CategorySlug =
  | "ai-machine-learning"
  | "data-science"
  | "programming"
  | "study-tips"
  | "productivity-tools"
  | "tech-news";

export type CategoryDefinition = {
  slug: CategorySlug;
  label: string;
  description: string;
};

/** Main taxonomy — markdown `category` frontmatter uses `label`. */
export const CATEGORY_DEFINITIONS: readonly CategoryDefinition[] = [
  {
    slug: "ai-machine-learning",
    label: "AI & Machine Learning",
    description: "Models, agents, prompting, and learning workflows powered by AI.",
  },
  {
    slug: "data-science",
    label: "Data Science",
    description: "Analysis, experimentation, visualization, and data-backed decisions.",
  },
  {
    slug: "programming",
    label: "Programming",
    description: "Engineering fundamentals, tooling, and shipping resilient software.",
  },
  {
    slug: "study-tips",
    label: "Study Tips",
    description: "Habits, focus, exams, and study systems that compound results.",
  },
  {
    slug: "productivity-tools",
    label: "Productivity Tools",
    description: "Workflows and stacks that help you learn and earn efficiently.",
  },
  {
    slug: "tech-news",
    label: "Tech News",
    description: "Policy, ethics, security, and the broader evolving tech landscape.",
  },
];

export const CATEGORY_LABELS = CATEGORY_DEFINITIONS.map((c) => c.label);

export function categorySlugFromLabel(label: string): CategorySlug | null {
  const found = CATEGORY_DEFINITIONS.find((c) => c.label === label);
  return found?.slug ?? null;
}

export function categoryBySlug(slug: string): CategoryDefinition | null {
  return CATEGORY_DEFINITIONS.find((c) => c.slug === slug) ?? null;
}
