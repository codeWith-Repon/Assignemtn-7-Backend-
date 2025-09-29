import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { projectServices } from "./project.service";


const addProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await projectServices.addProject(req.body)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Project added successfully",
        data: result
    })
})


const getAllProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await projectServices.getAllProject()

    sendResponse(res, {
        success: true,
        statusCode: 201,
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
    const payload = req.body


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