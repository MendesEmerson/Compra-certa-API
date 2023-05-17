import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export const ensureAuthenticateUser = (request: FastifyRequest, response: FastifyReply, done: () => void) => {
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
        return done()
    } catch (error) {
        return response.status(401).send({
            error: "Invalid token",
        });
    }
}
