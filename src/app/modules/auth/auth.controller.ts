import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.credentialsLogin(req.body.email, req.body.password)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: result
    })
})

export const authController = {
    credentialsLogin
}