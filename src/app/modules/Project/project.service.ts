import { Prisma } from "@prisma/client"
import { prisma } from "../../config/db"
import { generateSlug } from "../../utils/dynamicSlug"
import AppError from "../../errorHelpers/AppError"
import { excludeFields } from "../../utils/excludeFields"

const addProject = async (payload: Prisma.ProjectCreateInput) => {

    const existingProject = await prisma.project.findUnique({
        where: {
            title: payload.title
        }
    })

    if (existingProject) {
        console.log("💀💀💀💀")
        throw new AppError(401, "Project already exists")
    }

    const slug = await generateSlug(payload.title, "project")

    const project = await prisma.project.create({
        data: { ...payload, slug },
        include: {
            owner: true
        }
    })

    if (project.owner) {
        project.owner = excludeFields(project.owner, ["password", "role", "isActive", "isVerified", "isDeleted", "createdAt", "updatedAt"])
    }

    return project
}

const getAllProject = async () => {

    const projects = await prisma.project.findMany({
        include: {
            owner: true
        },
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

    return projects
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

    const updatedProject = await prisma.project.update({
        where: {
            slug
        },
        data: {
            ...payload
        }
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

