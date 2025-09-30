import { Prisma } from '@prisma/client'
import { prisma } from '../../config/db'
import bcryptjs from 'bcryptjs'
import { envVars } from '../../config/env'
import AppError from '../../errorHelpers/AppError'
import { AuthProvider } from '../../constants'
import { excludeFields } from '../../utils/excludeFields'

const createUser = async (payload: Prisma.UserCreateInput) => {
    const { email, password, ...rest } = payload

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) {
        throw new AppError(400, 'User already exists.')
    }

    if (!password) {
        throw new AppError(400, "Password is required for credentials signup");
    }


    const hashedPassword = await bcryptjs.hash(password, Number(envVars.BCRYPT_SALT_ROUND))


    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            ...rest,
            providers: {
                create: {
                    provider: AuthProvider.CREDENTIAL,
                    providerID: email
                }
            }
        },
        include: {
            providers: true
        }
    })

    return excludeFields(user, ["password"])
}

const getAllUser = async () => {
    const users = await prisma.user.findMany()

    return users.map((user) => excludeFields(user, ["password"]))
}
const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!user) {
        throw new AppError(404, "User not found.")
    }

    return excludeFields(user, ["password"])
}

const updateUser = async (id: string, payload: Prisma.UserUpdateInput) => {

    if (payload.password) {
        const hashedPassword = await bcryptjs.hash(payload.password as string, Number(envVars.BCRYPT_SALT_ROUND))
        payload.password = hashedPassword
    }
    const user = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: payload
    })

    return excludeFields(user, ["password"])
}

export const userServices = {
    createUser,
    getAllUser,
    getUserById,
    updateUser
}