import { Elysia } from "elysia";
import { z } from "zod";
import db from "../../db/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { jwtPlugin } from "../../plugins/jwt"; 

interface Topic extends RowDataPacket {
  title: string;
  description?: string | null;
}

const topicBodySchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
});

export const topics = new Elysia({ prefix: "/topics" })
  .use(jwtPlugin)

  // 🔹 GET /api/topics
  .get("/", async ({ jwt, request, set }) => {
    try {
      const authHeader = request.headers.get("authorization");
      if (!authHeader) {
        set.status = 401;
        return { error: "No token provided" };
      }

      const token = authHeader.split(" ")[1];
      const decoded = await jwt.verify(token);
      if (!decoded || !decoded.id) {
        set.status = 403;
        return { error: "Invalid token" };
      }

      const userId = decoded.id;
      const [data] = await db.query<Topic[]>(
        "SELECT * FROM topics WHERE user_id = ?",
        [userId]
      );

      return data;
    } catch (error) {
      console.error("Error al obtener los tópicos:", error);
      set.status = 500;
      return { message: "Error del servidor" };
    }
  })

  // 🔹 POST /api/topics
  .post(
    "/",
    async ({ jwt, request, body, set }) => {
      try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
          set.status = 401;
          return { error: "No token provided" };
        }

        const token = authHeader.split(" ")[1];
        const decoded = await jwt.verify(token);
        if (!decoded || !decoded.id) {
          set.status = 403;
          return { error: "Invalid token" };
        }

        const userId = decoded.id;
        const { title, description } = body;

        const [result] = await db.query<ResultSetHeader>(
          "INSERT INTO topics (user_id, title, description) VALUES (?, ?, ?)",
          [userId, title, description]
        );

        set.status = 201;
        return {
          message: "Topic added successfully",
          topicId: result.insertId,
        };
      } catch (error: any) {
        console.error("Error inserting topic:", error);
        set.status = 500;
        return { message: "Something went wrong", error: error.message };
      }
    },
    { body: topicBodySchema }
  )

  // 🔹 PUT /api/topics/:id
  .put(
    "/:id",
    async ({ jwt, request, params: { id }, body, set }) => {
      try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
          set.status = 401;
          return { error: "No token provided" };
        }

        const token = authHeader.split(" ")[1];
        const decoded = await jwt.verify(token);
        if (!decoded || !decoded.id) {
          set.status = 403;
          return { error: "Invalid token" };
        }

        const userId = decoded.id;
        const { title, description } = body;

        const [result] = await db.query<ResultSetHeader>(
          "UPDATE topics SET title = ?, description = ? WHERE id = ? AND user_id = ?",
          [title, description, id, userId]
        );

        if (result.affectedRows === 0) {
          set.status = 404;
          return { message: "Tema no encontrado o no autorizado" };
        }

        return { message: "Tema actualizado correctamente" };
      } catch (error: any) {
        console.error("Error updating topic:", error);
        set.status = 500;
        return { message: "Error en el servidor", error: error.message };
      }
    },
    { body: topicBodySchema }
  )

  // 🔹 DELETE /api/topics/:id
  .delete("/:id", async ({ jwt, request, params: { id }, set }) => {
    try {
      const authHeader = request.headers.get("authorization");
      if (!authHeader) {
        set.status = 401;
        return { error: "No token provided" };
      }

      const token = authHeader.split(" ")[1];
      const decoded = await jwt.verify(token);
      if (!decoded || !decoded.id) {
        set.status = 403;
        return { error: "Invalid token" };
      }

      const userId = decoded.id;

      const [result] = await db.query<ResultSetHeader>(
        "DELETE FROM topics WHERE id = ? AND user_id = ?",
        [id, userId]
      );

      if (result.affectedRows === 0) {
        set.status = 404;
        return { message: "Topic not found or not authorized" };
      }

      return { message: "Topic successfully deleted" };
    } catch (error: any) {
      console.error("Error al eliminar el tema:", error);
      set.status = 500;
      return { message: "Error al eliminar el tema", error: error.message };
    }
  });
