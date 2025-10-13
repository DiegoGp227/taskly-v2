// src/db/db.ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  database: process.env.DB_DATABASE, // ✅ asegúrate que sea DB_DATABASE, no DB_NAME
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
