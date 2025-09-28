import bcryptjs from "bcryptjs"
import { prisma } from "../../config/db"
import AppError from "../../errorHelpers/AppError";
import { createUserToken } from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";
import { excludeFields } from "../../utils/excludeFields";

const credentialsLogin = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) throw new AppError(404, "User not found.");

    const isPasswordCorrect = await bcryptjs.compare(password, user.password as string)

    if (!isPasswordCorrect) throw new AppError(401, "Invalid credentials.");

    const userToken = createUserToken(user)

    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user
    }
}

const getLoginUser = async (userId: string) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) throw new AppError(404, "User not found.")

    return excludeFields(user, ["password"])
}

export const authServices = {
    credentialsLogin,
    getLoginUser
}