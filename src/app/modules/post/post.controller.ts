import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postServices } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";


const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
        ...req.body,
        thumbnail: req.file?.path
    }
    const result = await postServices.createPost(payload)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Post created successfully",
        data: result
    })
})

const getAllPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postServices.getAllPost()

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Post fetched successfully",
        data: result
    })
})

const getSinglePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { slug } = req.params

    const result = await postServices.getSinglePost(slug)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Post fetched successfully",
        data: result
    })
})
const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { slug } = req.params
    const newThumbnails = req.file?.path

    const payload = {
        ...req.body,
    }

    if (req.file) {
        payload.thumbnail = newThumbnails
    }

    const result = await postServices.updatePost(slug, payload)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Post updated successfully",
        data: result
    })
})

const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { slug } = req.params

    const result = await postServices.deletePost(slug)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Post deleted successfully",
        data: result
    })
})

export const postController = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost
}