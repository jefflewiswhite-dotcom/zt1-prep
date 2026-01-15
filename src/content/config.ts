import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('ZT1 Prep Team'),
    category: z.enum([
      'guides',
      'gear',
      'comparisons',
      'checklists',
    ]),
    tags: z.array(z.string()).default([]),
    hub: z.string().optional(), // Parent hub for spoke articles
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    // SEO
    seoTitle: z.string().optional(),
    canonical: z.string().optional(),
    // Content flags
    contentType: z.enum([
      'pillar',      // Hub/pillar guide
      'roundup',     // Top 10 / Top 5 lists
      'comparison',  // A vs B
      'guide',       // How-to / informational
      'checklist',   // Printable checklist
    ]).default('guide'),
    // Affiliate
    hasAffiliateLinks: z.boolean().default(false),
    products: z.array(z.string()).default([]), // Product slugs referenced
  }),
});

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
    social: z.object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  posts,
  authors,
};
