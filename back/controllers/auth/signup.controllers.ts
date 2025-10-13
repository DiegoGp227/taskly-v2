import bcryptjs from "bcryptjs";
import db from "../../db/db.js";
import jwt, { type Secret } from "jsonwebtoken";
import type ms from "ms";

const SECRET_KEY = process.env.SECRET_KEY as Secret;
const TOKEN_EXPIRATION = (process.env.TOKEN_EXPIRATION || "1h") as ms.StringValue;


const signup = async ({ body, set }: { body: any; set: any }) => {
  const { username, email, password } = body;

  if (!username || !email || !password) {
    set.status = 400;
    return { message: "Some field is missing." };
  }

  try {
    console.log("Consultando usuario con email:", email);
    const [rows]: [any[], any] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      console.log("El usuario ya existe");
      set.status = 409;
      return { message: "User already exists." };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("Contraseña encriptada");

    const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [insertResult]: any = await db.execute(insertQuery, [username, email, hashedPassword]);

    console.log("Usuario creado exitosamente con ID:", insertResult.insertId);

    const token = jwt.sign({ id: insertResult.insertId, email }, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });

    set.status = 201;
    return {
      message: "User successfully created.",
      userId: insertResult.insertId,
      token,
      email,
      username,
    };
  } catch (error) {
    console.error("Error en la operación:", error);
    set.status = 500;
    return { message: "Internal server error." };
  }
};

export default signup;
