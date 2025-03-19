import { defineCollection, z } from 'astro:content';


const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    banner: image().optional(),
    alt: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};