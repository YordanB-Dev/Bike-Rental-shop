import type { Request, Response, } from "express";
import rentalService from "./rental.service";
import asyncHandler from "../asyncHandler";



export const rentalController = {

    create: asyncHandler(async(req: Request, res: Response) => {
        const userId = req.user.id;
        const {bikeId, startTime} = req.body;

        const result = await rentalService.createRental(
            userId,
            bikeId,
            new Date(startTime)
        );

        return res.status(201).json(result);
    })
};

export default rentalController;