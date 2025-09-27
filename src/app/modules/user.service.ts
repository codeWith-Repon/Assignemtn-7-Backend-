import { Prisma } from '@prisma/client'
import { prisma } from '../config/db'

const createUser = async (payload: Prisma.UserCreateInput) => {
    const { email } = payload

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) {
        throw new Error('User already exists')
    }

    return prisma.user.create({
        data: payload
    })
}

export const userService = {
    createUser
}