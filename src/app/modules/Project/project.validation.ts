import z from "zod";

export const addProjectZodSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .optional(),
    thumbnail: z.
        array(z.url("Thumbnail must be a valid URL"))
        .optional(),
    technologies: z
        .array(z.string()),
    features: z
        .array(z.string()),
    liveUrl: z
        .url("Live URL must be a valid URL"),
    githubUrls: z
        .object({
            frontend: z.url("Frontend URL must be valid"),
            backend: z.url("Backend URL must be valid"),
        })
        .optional(),
    ownerId: z
        .number({ message: "Owner ID is required" }),
    isFeatured: z
        .boolean()
        .optional()
})

export const updateProjectZodSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 3 characters")
        .optional(),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .optional(),
    thumbnail: z
        .url("Thumbnail must be a valid URL")
        .optional(),
    technologies: z
        .array(z.string())
        .optional(),
    features: z
        .array(z.string())
        .optional(),
    liveUrl: z
        .url("Live URL must be a valid URL")
        .optional(),
    githubUrl: z
        .url("Github URL must be a valid URL")
        .optional(),
    ownerId: z
        .number({ message: "Owner ID is required" })
        .optional(),
    isFeatured: z
        .boolean()
        .optional()
})