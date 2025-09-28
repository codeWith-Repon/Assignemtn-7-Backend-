import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.credentialsLogin(req.body.email, req.body.password)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: result
    })
})
const getLoginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     const decodedToken = req.user as JwtPayload
    const result = await authServices.getLoginUser(decodedToken.userId)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User profile fetched successfully",
        data: result
    })
})

export const authController = {
    credentialsLogin,
    getLoginUser
}