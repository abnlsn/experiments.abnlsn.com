import { z, defineCollection } from "astro:content";

const experimentCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        date: z.date(),
        url: z.string().optional()
    })
})

export const collections = {
    "experiments": experimentCollection,
}