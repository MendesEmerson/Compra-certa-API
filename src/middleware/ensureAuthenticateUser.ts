import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export const ensureAuthenticateUser = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        return response.status(401).send({
            error: "Token missing",
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, "bbca61cf2f25de7dfbe347b803122fda") as IPayload;
        request.user_id = sub
        next()
    } catch (error) {
        return response.status(401).send({
            error: "Invalid token",
        });
    }
}
