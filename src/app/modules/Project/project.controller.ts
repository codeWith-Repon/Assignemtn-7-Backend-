import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { projectServices } from "./project.service";


const addProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = {
        ...req.body,
        ownerId: 1,
        thumbnails: (req.files as Express.Multer.File[]).map(file => file.path)
    }

    const result = await projectServices.addProject(payload)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Project added successfully",
        data: result
    })
})


const getAllProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
    const result = await projectServices.getAllProject({ page, limit, isFeatured })
   
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Project fetched successfully",
        data: result
    })
})

const getSingleProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params
    const result = await projectServices.getSingleProject(slug)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Project fetched successfully",
        data: result
    })
})


const updateProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params
    const newThumbnails =
        (req.files as Express.Multer.File[] | undefined)?.map((file) => file.path) || [];


    const payload = {
        ...req.body,
    }

    if (newThumbnails.length > 0) {
        console.log("new file added")
        payload.thumbnail = newThumbnails
    }

    const result = await projectServices.updateProject(slug, payload)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Project updated successfully",
        data: result
    })
})


const deleteProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params
    const result = await projectServices.deleteProject(slug)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Project deleted successfully",
        data: result
    })
})

export const projectController = {
    addProject,
    getAllProject,
    getSingleProject,
    updateProject,
    deleteProject
}