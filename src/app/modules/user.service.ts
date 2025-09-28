import { Prisma } from '@prisma/client'
import { prisma } from '../config/db'
import bcryptjs from 'bcryptjs'
import { envVars } from '../config/env'
import AppError from '../errorHelpers/AppError'
import { AuthProvider } from '../constants'
import { excludeFields } from '../utils/excludeFields'

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

    return excludeFields(user, ["password", "isVerified", "isDeleted", "isActive"])
}

export const userServices = {
    createUser
}