import rentRepository from "./rental.repository";
import bikeRepository from "../bikes/bike.repository";
import AppError from "../AppError";


export const rentalService = {

    async createRental(userId: number, bikeId: number) {

        const bike = await bikeRepository.findById(bikeId);
        if (!bike) {
            throw new AppError(`Bike not found`, 404);
        }

        if (!bike.isAvailable) {
            throw new AppError(`Bike is no longer available please try later`, 400);
        }

        const startTime = new Date();

        const status = "active";

        const rental = await rentRepository.create(userId, bikeId, startTime, status);
        await bikeRepository.updateAvailability(bikeId, false);
        return rental;
    },

    async returnRental(rentalId: number) {

        const rental = await rentRepository.getById(rentalId);
        if (!rental) {
            throw new AppError(`Rental not found`, 404);
        }

        if (rental.status !== "active") {
            throw new AppError(`Rental is no longer active`, 400);
        }

        const bike = await bikeRepository.findById(rental.bike_id);
        if (!bike) {
            throw new AppError(`Bike not found`, 404);
        }

        const endTime = new Date();

        const durationMs = endTime.getTime() - rental.start_time.getTime();

        const durationHours = durationMs / (1000 * 60 * 60);

        const totalPrice = durationHours * bike.price_per_hour;
        await rentRepository.updateTotalPrice(rentalId, totalPrice)

        await rentRepository.updateEndTime(rentalId, endTime);
        await rentRepository.updateStatus(rentalId, "completed");
        await bikeRepository.updateAvailability(rental.bike_id, true);

        return {
            message: "Rental returned successfully"
        };
    }
};