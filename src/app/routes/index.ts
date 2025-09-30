import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/post/post.route";
import { ProjectRoutes } from "../modules/Project/project.route";

export const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/posts",
        route: PostRoutes
    },
    {
        path: "/projects",
        route: ProjectRoutes
    }
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})