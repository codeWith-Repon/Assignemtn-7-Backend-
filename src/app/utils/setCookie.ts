import { Response } from "express"
import { envVars } from "../config/env";

export interface AuthTokens {
    accessToken?: string
    refreshToken?: string
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
    const isProduction = envVars.NODE_ENV === 'production';

    if (tokenInfo.accessToken) {
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        })
    }

    if (tokenInfo.refreshToken) {
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 60 * 60 * 24 * 30,
            path: "/"
        })
    }
}