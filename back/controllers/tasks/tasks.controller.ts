import { Elysia } from "elysia";
import { z } from "zod";
import db from "../../db/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { jwtPlugin } from "../../plugins/jwt";

interface Task extends RowDataPacket {
  id: number;
  user_id: number;
  topics_id: number;
  title: string;
  priority: number;
  status: number;
}

const tasksBodySchema = z.object({
  topics_id: z.number().int().positive("El ID del topic es obligatorio"),
  title: z.string().min(1, "El título es obligatorio"),
  priority: z.number().int().min(1).max(3, "La prioridad debe ser 1 (low), 2 (medium) o 3 (high)"),
  status: z.number().int().min(0).max(1, "El estado debe ser 0 (todo) o 1 (done)"),
});

const tasksUpdateSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").optional(),
  priority: z.number().int().min(1).max(3, "La prioridad debe ser 1 (low), 2 (medium) o 3 (high)").optional(),
  status: z.number().int().min(0).max(1, "El estado debe ser 0 (todo) o 1 (done)").optional(),
});

export const tasks = new Elysia({ prefix: "/tasks" })
  .use(jwtPlugin)

  // 🔹 GET /api/tasks/:topicId/status/:status - Obtener tareas de un topic filtradas por estado
  .get("/:topicId/status/:status", async ({ jwt, request, params: { topicId, status }, set }) => {
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
      const [data] = await db.query<Task[]>(
        "SELECT * FROM tasks WHERE user_id = ? AND topics_id = ? AND status = ?",
        [userId, topicId, status]
      );

      return data;
    } catch (error) {
      console.error("Error al obtener las tareas por estado:", error);
      set.status = 500;
      return { message: "Error del servidor" };
    }
  })

  // 🔹 POST /api/tasks - Crear una nueva tarea
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
        const { topics_id, title, priority, status } = body;

        const [result] = await db.query<ResultSetHeader>(
          "INSERT INTO tasks (user_id, topics_id, title, priority, status) VALUES (?, ?, ?, ?, ?)",
          [userId, topics_id, title, priority, status]
        );

        set.status = 201;
        return {
          message: "Task added successfully",
          taskId: result.insertId,
        };
      } catch (error: any) {
        console.error("Error inserting task:", error);
        set.status = 500;
        return { message: "Something went wrong", error: error.message };
      }
    },
    { body: tasksBodySchema }
  )

  // 🔹 PUT /api/tasks/:id - Actualizar una tarea
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

        // Construir query dinámicamente basado en los campos presentes
        const updates: string[] = [];
        const values: any[] = [];

        if (body.title !== undefined) {
          updates.push("title = ?");
          values.push(body.title);
        }
        if (body.priority !== undefined) {
          updates.push("priority = ?");
          values.push(body.priority);
        }
        if (body.status !== undefined) {
          updates.push("status = ?");
          values.push(body.status);
        }

        if (updates.length === 0) {
          set.status = 400;
          return { message: "No se proporcionaron campos para actualizar" };
        }

        values.push(id, userId);

        const [result] = await db.query<ResultSetHeader>(
          `UPDATE tasks SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`,
          values
        );

        if (result.affectedRows === 0) {
          set.status = 404;
          return { message: "Tarea no encontrada o no autorizada" };
        }

        return { message: "Tarea actualizada correctamente" };
      } catch (error: any) {
        console.error("Error updating task:", error);
        set.status = 500;
        return { message: "Error en el servidor", error: error.message };
      }
    },
    { body: tasksUpdateSchema }
  )

  // 🔹 DELETE /api/tasks/:id - Eliminar una tarea
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
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        [id, userId]
      );

      if (result.affectedRows === 0) {
        set.status = 404;
        return { message: "Tarea no encontrada o no autorizada" };
      }

      return { message: "Tarea eliminada correctamente" };
    } catch (error: any) {
      console.error("Error al eliminar la tarea:", error);
      set.status = 500;
      return { message: "Error al eliminar la tarea", error: error.message };
    }
  });
