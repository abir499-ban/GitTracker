// import { drizzle } from 'drizzle-orm/neon-http';
// export const db = drizzle(process.env.DATABASE_URL as string);

import {PrismaClient} from '../generated/prisma'

export const prismaClient = new PrismaClient()