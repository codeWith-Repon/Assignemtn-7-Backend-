import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { registerUserZodSchema } from "./user.validation";


const router = Router()

router.post("/",
    validateRequest(registerUserZodSchema),
    userController.createUser
)
router.get("/users",
    userController.getAllUser
)
router.get("/:id",
    userController.getUserById
)
router.patch("/:id",
    userController.updateUser
)

export const UserRoutes = router