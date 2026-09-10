import bikesReposiotry from "./bike.repository";
import AppError from "../AppError";



export const bikeSerivce = {
    async getAllBikes() {
        const existing = await bikesReposiotry.findAll();
        return existing;
    },

    async getBikeById(id: number) {
        const result = await bikesReposiotry.findById(id);
        if (!result) {
            throw new AppError(`Cant find the bike`, 404);
        }

        return result;
    },

    async createBike(productData: any) {
        
        const {brand, model, type, pricePerHour} = productData;

        if (!brand || brand.trim().length <= 2) {
            throw new AppError(`Invalid brand`, 400);
        }

        if (!model || model.trim().length <= 0) {
            throw new AppError(`Invalid model`, 400);
        }

        if (!type || type.trim().length <= 0) {
            throw new AppError(`Invlaid type`, 400);
        }

        if (pricePerHour <= 0) {
            throw new AppError(`Invalid price`, 400);
        }

        return await bikesReposiotry.create(brand, model, type, pricePerHour);
    },
};

export default bikeSerivce;