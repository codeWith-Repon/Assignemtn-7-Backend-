import { Prisma } from "@prisma/client"
import { prisma } from "../../config/db"
import { generateSlug } from "../../utils/dynamicSlug"
import AppError from "../../errorHelpers/AppError"
import { excludeFields } from "../../utils/excludeFields"

const addProject = async (payload: Prisma.ProjectCreateInput) => {

    if (typeof payload.isFeatured === "string") {
        payload.isFeatured = payload.isFeatured === "true";
    }

    const slug = await generateSlug(payload.title, "project")

    const projectData = { ...payload, slug }

    const project = await prisma.project.create({
        data: projectData,
        include: {
            owner: true
        }
    })

    if (project.owner) {
        project.owner = excludeFields(project.owner, ["password", "role", "isActive", "isVerified", "isDeleted", "createdAt", "updatedAt"])
    }

    return project
}

const getAllProject = async ({
    page,
    limit,
    isFeatured,
}: {
    page: number,
    limit: number,
    isFeatured?: boolean
}) => {
    const skip = (page - 1) * limit

    const projects = await prisma.project.findMany({
        include: {
            owner: true
        },
        where: {
            isFeatured
        },
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc"
        }
    })

    projects.map((project) => {
        if (project.owner) {
            project.owner = excludeFields(project.owner, ["password", "role", "isActive", "isVerified", "isDeleted", "createdAt", "updatedAt"])
        }
        return project
    })

    const total = await prisma.project.count({
        where: {
            isFeatured
        }
    })
    const totalPages = Math.ceil(total / limit)

    return {
        meta: {
            page,
            limit,
            totalPage: totalPages,
            total
        },
        data: projects
    }
}

const getSingleProject = async (slug: string) => {

    const project = await prisma.project.findUnique({
        where: {
            slug
        },
        include: {
            owner: true
        }
    })

    if (!project) {
        throw new AppError(404, "Project not found")
    }

    if (project.owner) {
        project.owner = excludeFields(project.owner, ["password", "role", "isActive", "isVerified", "isDeleted", "createdAt", "updatedAt"])
    }

    return project

}

const updateProject = async (slug: string, payload: Prisma.ProjectUpdateInput) => {

    const project = await prisma.project.findUnique({
        where: {
            slug
        }
    })

    if (!project) {
        throw new AppError(404, "Project not found")
    }

    if (typeof payload.title === "string") {
        const newSlug = await generateSlug(payload.title, "project")
        payload.slug = newSlug
    }

    if (payload.thumbnails) {
        payload.thumbnails = [
            ...(project.thumbnails || []),
            ...(payload.thumbnails as string[])
        ];
    }

    const updatedProject = await prisma.project.update({
        where: {
            slug
        },
        data: payload

    })

    return updatedProject

}
const deleteProject = async (slug: string) => {
    const project = await prisma.project.findUnique({
        where: {
            slug
        }
    })

    if (!project) {
        throw new AppError(404, "Project not found")
    }

    await prisma.project.delete({
        where: {
            slug
        }
    })

    return null
}

export const projectServices = {
    addProject,
    getAllProject,
    getSingleProject,
    updateProject,
    deleteProject
}

