import { Router } from "express";
import { postController } from "./post.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../constants";


const router = Router()


router.post("/",
    checkAuth(Role.ADMIN),
    postController.createPost
)
router.get("/",
    postController.getAllPost
)
router.get("/:slug",
    postController.getSinglePost
)
router.patch("/:slug",
    checkAuth(Role.ADMIN),
    postController.updatePost
)

router.delete("/:slug",
    checkAuth(Role.ADMIN),
    postController.deletePost
)

export const PostRoutes = router