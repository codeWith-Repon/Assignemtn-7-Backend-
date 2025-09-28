import bcryptjs from "bcryptjs"
import { prisma } from "../../config/db"
import AppError from "../../errorHelpers/AppError";
import { createUserToken } from "../../utils/userToken";

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

export const authServices = {
    credentialsLogin
}