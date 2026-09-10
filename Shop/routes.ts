import express from "express";
import userController from "./user/userController";
import authMiddleware from "./authMiddleware";
import bikeController from "./bikes/bike.controller";

const router = express.Router();


router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);

router.post("/bikes", authMiddleware, bikeController.create);
router.get("/bikes", bikeController.getAll);
router.get("/bikes/:id", bikeController.getById);


export default router;