// import { PrismaClient } from "../generated/prisma/client";
//
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
//
// export const prisma =
//     globalForPrisma.prisma ||
//     new PrismaClient({
//         log: ["query", "info", "warn", "error"],
//     });
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
//
// export default prisma;

import { PrismaClient } from "@/src/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

// Initialize Prisma Client with the Accelerate extension
// Note: The new Prisma Client should be instantiated only once in your application.
const prisma =
    globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// In development, store the client globally
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
