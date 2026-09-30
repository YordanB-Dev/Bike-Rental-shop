import  express  from "express";
import authMiddleware from "./authMiddleware";
import rentalController from "./rentals/rental.controller";

const rentalRoutes = express.Router();

rentalRoutes.post("/", authMiddleware, rentalController.createRental);
rentalRoutes.post("/", authMiddleware, rentalController.returnRental); 

export default rentalRoutes;