import express from "express";
import type { Request, Response} from "express";

const app = express();

app.use(express.json());

app.use("/", (req: Request, res: Response) => {
    res.send("Welcome to backend server");
});

export default app;