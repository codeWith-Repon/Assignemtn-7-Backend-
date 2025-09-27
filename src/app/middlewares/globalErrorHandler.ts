import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode = 500
    const message = "**Something went wrong!!"

    res.status(statusCode).json({
        success: false,
        message,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}