export type TocItem = { id: string; level: number; text: string };

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Extract ## / ### headings for table of contents; IDs match rehype-slug behavior. */
export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split(/\r?\n/);
  const items: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const level = m[1].length;
    const raw = m[2].trim();
    const base = slugify(raw);
    const n = (slugCounts.get(base) ?? 0) + 1;
    slugCounts.set(base, n);
    const id = n === 1 ? base : `${base}-${n}`;
    items.push({ id, level, text: raw });
  }

  return items;
}
