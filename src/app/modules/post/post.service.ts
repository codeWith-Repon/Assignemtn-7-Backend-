import { Prisma } from "@prisma/client"
import { prisma } from "../../config/db"
import { excludeFields } from "../../utils/excludeFields"
import AppError from "../../errorHelpers/AppError"
import { generateSlug } from "../../utils/dynamicSlug"


const createPost = async (payload: Prisma.PostCreateInput) => {

    const slug = await generateSlug(payload.title, "post")

    const post = await prisma.post.create({
        data: { ...payload, slug },
        include: {
            author: true
        }
    })
    if (post.author) {
        post.author = excludeFields(post.author, ["password"])
    }
    return post
}

const getAllPost = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const sanitizedPosts = posts.map((post) => {
        if (post.author) {
            post.author = excludeFields(post.author, ["password", "role", "isActive", "isVerified", "isDeleted", "createdAt", "updatedAt"])
        }
        return post
    })


    return sanitizedPosts
}

const getSinglePost = async (slug: string) => {
    const result = await prisma.$transaction(async (tx) => {

        const post = await tx.post.findUnique({
            where: {
                slug
            },
            include: {
                author: true
            }
        })

        if (!post) {
            throw new AppError(404, "Post not found")
        }

        await tx.post.update({
            where: { slug },
            data: { views: post.views + 1 }
        })

        if (post.author) {
            post.author = excludeFields(post.author, ["password", "role", "isActive", "isVerified", "isDeleted", "createdAt", "updatedAt"])
        }
        return post
    })



    return result
}

const updatePost = async (slug: string, payload: Partial<Prisma.PostUpdateInput>) => {
    const post = await prisma.post.findUnique({
        where: {
            slug
        }
    })

    if (!post) {
        throw new AppError(404, "Post not found")
    }

    if (typeof payload.title === "string") {
        const newSlug = await generateSlug(payload.title, "post")
        payload.slug = newSlug
    }

    const updatedPost = await prisma.post.update({
        where: {
            slug
        },
        data: {
            ...payload
        }
    })

    return updatedPost
}

const deletePost = async (slug: string) => {
    const post = await prisma.post.findUnique({
        where: {
            slug
        }
    })

    if (!post) {
        throw new AppError(404, "Post not found")
    }

    await prisma.post.delete({
        where: {
            slug
        }
    })

    return null
}



export const postServices = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost
}