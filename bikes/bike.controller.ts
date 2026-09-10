import type { Request, Response, } from "express";
import bikeSerivce from "./bike.service";
import asyncHandler from "../asyncHandler"



export const bikeController = {
    getAll: asyncHandler(async(req: Request, res: Response) => {
        const result = await bikeSerivce.getAllBikes();
        return res.status(200).json(result)
    }),

    getById: asyncHandler(async(req: Request, res: Response) => {
        const id = Number(req.params.id);
        const result = await bikeSerivce.getBikeById(id);
        return res.status(200).json(result);
    }),

    create: asyncHandler(async(req: Request, res: Response) => {
        const result = await bikeSerivce.createBike(req.body);
        return res.status(201).json(result);
    })
};

export default bikeController;