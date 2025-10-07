import { z } from "zod";

export const addPostZodSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters"),
    content: z
        .any()
        .refine((val) => typeof val === "object" || Array.isArray(val), {
            message: "Content must be a valid JSON object or array",
        }),
    thumbnail: z
        .url("Thumbnail must be a valid URL")
        .optional(),
    isPublished: z
        .boolean()
        .optional(),
    featured: z
        .boolean()
        .optional(),
    tags: z
        .array(z.string())
        .optional(),
    authorId: z
        .number({ message: "Author ID is required" }),
});

export const updatePostZodSchema = addPostZodSchema.partial();
