import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import AppError from "./AppError";

const portEnv = process.env.PORT;
const PORT = portEnv ? Number(portEnv): 3000;

if (Number.isNaN(PORT) || PORT <= 0) {
    throw new AppError(`Invalid PORT value. SET process.env.PORT to a positive number`, 400);
};

app.listen(PORT, () => {
    console.log(`Server is started on on http://localhost${PORT}`);
});