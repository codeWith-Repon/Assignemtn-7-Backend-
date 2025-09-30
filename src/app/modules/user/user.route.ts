import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { registerUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../constants";
import { multerUpload } from "../../config/multer.config";


const router = Router()

router.post("/",
    validateRequest(registerUserZodSchema),
    userController.createUser
)
router.get("/users",
    checkAuth(Role.ADMIN),
    userController.getAllUser
)
router.get("/:id",
    checkAuth(...Object.values(Role)),
    userController.getUserById
)
router.patch("/:id",
    checkAuth(...Object.values(Role)),
    multerUpload.single('file'),
    validateRequest(updateUserZodSchema),
    userController.updateUser
)

export const UserRoutes = router