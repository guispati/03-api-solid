import fastify from "fastify";
import { PrismaClient } from '@prisma/client';

export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
    data: {
        name: 'Guilherme Spati',
        email: 'guilherme.spati723@gmail.com'
    }
})