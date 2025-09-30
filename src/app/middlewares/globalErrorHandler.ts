import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { deleteImageFromCloudinary } from "../config/cloudinary.config";

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

    if (envVars.NODE_ENV === "development") console.error(err)

    if (req.file) await deleteImageFromCloudinary(req.file.path)

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const imageUrls = (req.files as Express.Multer.File[]).map(file => file.path)

        await Promise.all(imageUrls.map(url => deleteImageFromCloudinary(url)))
    }

    let statusCode = 500
    let message = "**Something went wrong!!"

    if (err.name === "ZodError") {
        statusCode = 400,
            message = "Validation failed"
    }
    else if (err.name === "PrismaClientValidationError") {
        statusCode = 400,
            message = "Prisma Validation failed"
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode,
            message = err.message
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}