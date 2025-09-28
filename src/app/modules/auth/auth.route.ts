import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../constants";


const router = Router()

router.post("/login",
    authController.credentialsLogin
)

router.get("/me",
    checkAuth(...Object.values(Role)),
    authController.getLoginUser
)


export const AuthRoutes = router