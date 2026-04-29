import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

//解决热重载导致数据库连接泄露