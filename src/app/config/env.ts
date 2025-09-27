import dotenv from "dotenv"


dotenv.config();


interface EnvConfig {
    PORT: string,
    NODE_ENV: string,
    FRONTEND_URL: string,
    BCRYPT_SALT_ROUND: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = [
        'PORT',
        'NODE_ENV',
        'FRONTEND_URL',
        "BCRYPT_SALT_ROUND"
    ];

    requiredEnvVariables.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing environment variable: ${key}`);
        }
    })

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string
    }
}

export const envVars: EnvConfig = loadEnvVariables()