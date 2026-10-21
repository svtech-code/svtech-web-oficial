import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    description: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('SV Tech'),
    category: z.enum(['soporte', 'herramientas', 'desarrollo', 'tutoriales']),
    image: z.string(),
    imageAlt: z.string(),
    readTime: z.string().default('3 min de lectura'),
    featured: z.boolean().default(false),
    downloadUrl: z.string().optional(),
    officialUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { services, blog };
