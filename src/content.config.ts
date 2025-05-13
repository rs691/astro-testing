import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const workCollection = defineCollection({
  type: 'content', // 'content' for Markdown/MDX. Use 'data' for JSON/YAML
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    publishDate: z.coerce.date(), // z.coerce.date() is great for converting string dates to Date objects
    tags: z.array(z.string()),
    email: z.string().email().optional(), // Use .email() for email validation
    website: z.string().url().optional(), // Use .url() for URL validation
    github: z.string().url().optional(),  // Use .url() for URL validation
    img: z.string().optional(),
    img_alt: z.string().optional(),
  }),
});

export const collections = { blog, 
							work: workCollection };
