import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);

    res.status(200).json(result)

}

export const userController = {
    createUser
}