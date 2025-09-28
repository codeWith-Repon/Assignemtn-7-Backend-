import { prisma } from "../config/db"
import { envVars } from "../config/env"
import bcryptjs from "bcryptjs"
import { AuthProvider, RoleEnum } from "../constants"


export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await prisma.user.findUnique({
            where: {
                email: envVars.SUPER_ADMIN_EMAIL
            }
        })

        if (isSuperAdminExist) {
            console.log("Admin already exist")
            return
        }

        const hashedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))

        const payload = {
            name: "Admin",
            role: RoleEnum.ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
        }

        const user = await prisma.user.create({
            data: {
                ...payload,
                providers: {
                    create: {
                        provider: AuthProvider.CREDENTIAL,
                        providerID: envVars.SUPER_ADMIN_EMAIL
                    }
                }
            },
            include: {
                providers: true
            }
        })

        console.log("Super admin created successfully: ", user)


    } catch (error) {
        console.log(error)
    }
}