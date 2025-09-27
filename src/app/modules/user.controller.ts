import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User created successfully",
        data: user
    })
})

export const userController = {
    createUser
}