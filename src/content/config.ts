import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  schema: z.object({
    order: z.number(),
    title: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    description: z.string(),
  }),
});

export const collections = { services };
