import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, response: FastifyReply) {
    const checkInHHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = checkInHHistoryQuerySchema.parse(request.query);

    const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
        userId: request.user.sub,
        page,
    });

    return response.status(200).send({
        checkIns,
    });
};