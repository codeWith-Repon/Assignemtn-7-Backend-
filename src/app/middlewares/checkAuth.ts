import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../config/db";


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.headers.authorization || req.cookies.accessToken

        if (!accessToken) throw new AppError(403, "No Token Received.")


        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        const isUserExist = await prisma.user.findUnique({
            where: {
                email: verifiedToken.email
            }
        })
        // console.log(verifiedToken, "verify token from checkAuth")

        if (!isUserExist) throw new AppError(400, "User doesn't exist..")

        if (isUserExist.isDeleted) throw new AppError(400, "User is Deleted..")

        if (!authRoles.includes(verifiedToken.role)) throw new AppError(400, "You are not permitted to view this route!!")

        req.user = verifiedToken
        next()
    } catch (error) {
        next(error)
    }
}