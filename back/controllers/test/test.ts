import pool from "../../db/db";

const dbCheck = async ({ set }: { set: any }) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    set.status = 200;
    return { status: "success", result: rows };
  } catch (error) {
    console.error("❌ Error al conectar con MySQL:", error);
    set.status = 500;
    return { status: "error", message: "No se pudo conectar a la base de datos" };
  }
};

export default dbCheck;
