import { QueryResult } from "pg";
import pool from "../db";

interface User {
    id: number,
    email: string,
    password: string,
    username: string;
}

const createUser = async (
    email: string,
    password: string,
    username: string
): Promise<User> => {
    const result: QueryResult<User> = await pool.query<User> (
        `INSERT INTO users (email, password, username)
        VALUES ($1, $2, $3)
        RETURNING id, email, password, username`,
        [email, password, username]
    );

    return result.rows[0];
}

const findUSerByEmail = async(email: string): Promise<User> => {
    const result: QueryResult<User> = await pool.query<User> (
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return result.rows[0];
}

export default {
    createUser,
    findUSerByEmail
};