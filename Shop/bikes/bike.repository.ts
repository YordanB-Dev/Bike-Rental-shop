import pool from "../db";
import { QueryResult } from "pg";

interface Bike {
    id: number;
    brand: string;
    model: string;
    type: string;
    pricePerHour: number;
    isAvailable: boolean;
}

export const bikesReposiotry = {
    async findAll(): Promise<Bike[]> {
        const result: QueryResult<Bike> = await pool.query (
            `SELECT * FROM bikes`,
        );

        return result.rows;
    },

    async findById(id: number): Promise<Bike | undefined> {
        const result: QueryResult<Bike> = await pool.query<Bike> (
            `SELECT * FROM bikes WHERE id = $1`,
            [id]
        );

        return result.rows[0];
    },

    async create(brand: string, model: string, type: string, pricePerHour: number): Promise<Bike> {
        const result: QueryResult<Bike> = await pool.query(
            `INSERT INTO bikes (brand, model, type, price_per_hour)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [brand, model, type, pricePerHour]
        )

        return result.rows[0];
    },

    async updateAvailability(id: number, isAvailable: boolean): Promise<Bike> {
        const result: QueryResult<Bike> = await pool.query<Bike> (
            `UPDATE bikes SET is_available = $1
            WHERE id = $2
            RETURNING *`,
            [isAvailable, id]
        );

        return result.rows[0];
    }
};

export default bikesReposiotry;