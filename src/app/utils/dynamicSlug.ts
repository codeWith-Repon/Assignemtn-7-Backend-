import { prisma } from "../config/db"

export const generateSlug = async (title: string) => {

    const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")

    let slug = baseSlug
    let counter = 0

    while (await prisma.post.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${++counter}`
    }

    return slug
}