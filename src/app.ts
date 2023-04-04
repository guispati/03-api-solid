import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { userRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
});

app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, response) => {
    if (error instanceof ZodError) {
        return response.status(400).send({
            message: 'Validation error', issues: error.format()
        });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    }

    return response.status(500).send({
        messaage: 'Internal server error.'
    });
});