import { TOKEN_SECRET } from "../config/token.js";
import jwt from "jsonwebtoken";

export async function createAccessToken(payload) {
    return new  Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1h" }, (err, token) => {
            if (err) reject(err);
            resolve (token);
            });
        });
    }
