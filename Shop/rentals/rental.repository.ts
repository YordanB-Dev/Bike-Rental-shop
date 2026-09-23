import { create } from "node:domain";
import AppError from "../AppError";
import pool from "../db";
import { QueryResult } from "pg";

interface Rental {
    id: number;
    user_id: number;
    bike_id: number;
    start_time: Date;
    end_time: Date | null;
    total_price: number | null;
    status: string;
}

export const rentRepository = {
    async getAll() {
        const result: QueryResult<Rental> = await pool.query<Rental> (
            `SELECT * FROM rentals`
        );

        return result.rows;
    },

    async getById(id: number): Promise<Rental | undefined> {
        const result: QueryResult<Rental> = await pool.query<Rental> (
            `SELECT * FROM rentals WHERE id = $1`,
            [id]
        );

        return result.rows[0];
    },

    async create (
        userId: number,
        bikeId: number,
        startTime: Date,
        status: string
    ): Promise<Rental> {
        const result: QueryResult<Rental> = await pool.query<Rental> (
            `INSERT INTO rentals 
            (user_id, bike_id, start_time, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [userId, bikeId, startTime, status]
        );

        return result.rows[0];
    },

    async updateStatus(rentalId: number, status: string) {
        const result: QueryResult<Rental> = await pool.query<Rental> (
            `UPDATE rentals SET status = $1 WHERE id = $2 RETURNING *`,
            [status, rentalId]
        );

        return result.rows[0];
    },

    async updateStartTime(rentalId: number, startTime: Date) {
        const result: QueryResult<Rental> = await pool.query<Rental> (
            `UPDATE rentals SET satrt_time = $1 WHERE id = $2 RETURNING *`,
            [startTime, rentalId]
        )

        return result.rows[0];
    },

    async updateEndTime(rentalId: number, endTime: Date) {
        const result: QueryResult<Rental> = await pool.query<Rental> (
            `UPDATE rentals SET end_time = $1 WHERE id = $2 RETURNING *`,
            [endTime ,rentalId]
        );

        return result.rows[0];
    },

    async updateTotalPrice(rentalId: number, totalPrice: number) {
        const result: QueryResult<Rental> = await pool.query<Rental> (
            `UPDATE rentals SET total_price = $1
            WHERE id = $2
            RETURNING *`,
            [totalPrice, rentalId]
        );

        return result.rows[0];
    }
};

export default rentRepository;