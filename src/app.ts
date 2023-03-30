import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes);

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