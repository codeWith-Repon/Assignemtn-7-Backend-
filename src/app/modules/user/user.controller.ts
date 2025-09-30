import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User created successfully",
        data: user
    })
})

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await userServices.getAllUser()

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Users fetched successfully",
        data: users
    })
})

const getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const users = await userServices.getUserById(id)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User fetched successfully",
        data: users
    })
})

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const payload = { ...req.body, picture: req.file?.path }

    const users = await userServices.updateUser(id, payload)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User updated successfully",
        data: users
    })
})

export const userController = {
    createUser,
    getAllUser,
    getUserById,
    updateUser
}