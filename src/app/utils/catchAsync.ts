import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";


type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;


export const catchAsync = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: any) => {
        if (envVars.NODE_ENV === "development") console.error(error)

        next(error)
    })
}