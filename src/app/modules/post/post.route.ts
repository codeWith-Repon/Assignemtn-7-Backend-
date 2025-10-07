import { Router } from "express";
import { postController } from "./post.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../constants";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { addPostZodSchema, updatePostZodSchema } from "./post.validate";


const router = Router()


router.post("/",
    // checkAuth(Role.ADMIN),
    multerUpload.single("file"),
    validateRequest(addPostZodSchema),
    postController.createPost
)
router.get("/",
    postController.getAllPost
)
router.get("/:slug",
    postController.getSinglePost
)
router.patch("/:slug",
    // checkAuth(Role.ADMIN),
    multerUpload.single("file"),
    validateRequest(updatePostZodSchema),
    postController.updatePost
)

router.delete("/:slug",
    checkAuth(Role.ADMIN),
    postController.deletePost
)

export const PostRoutes = router