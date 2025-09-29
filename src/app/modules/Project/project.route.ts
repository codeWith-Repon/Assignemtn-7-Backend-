import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../constants";
import { projectController } from "./project.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { addProjectZodSchema, updateProjectZodSchema } from "./project.validation";


const router = Router()


router.post("/",
    checkAuth(Role.ADMIN),
    validateRequest(addProjectZodSchema),
    projectController.addProject
)
router.get("/",
    projectController.getAllProject
)
router.get("/:slug",
    projectController.getSingleProject
)
router.patch("/:slug",
    checkAuth(Role.ADMIN),
    validateRequest(updateProjectZodSchema),
    projectController.updateProject
)

router.delete("/:slug",
    checkAuth(Role.ADMIN),
    projectController.deleteProject
)

export const ProjectRoutes = router