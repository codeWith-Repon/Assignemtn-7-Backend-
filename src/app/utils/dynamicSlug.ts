import { prisma } from "../config/db"

export const generateSlug = async (title: string, model: string) => {

    const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")

    let slug = baseSlug
    let counter = 0

    const checkSlugExists = async (slug: string) => {
        if (model === "post") {
            return await prisma.post.findUnique({ where: { slug } })
        } else if (model === "project") {
            return await prisma.project.findUnique({ where: { slug } })
        }
        return null
    }

    while (await checkSlugExists(slug)) {
        slug = `${baseSlug}-${++counter}`
    }

    return slug
}