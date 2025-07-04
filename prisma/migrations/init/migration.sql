-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "isAdmin" BOOLEAN DEFAULT false,
    "verifyPasswordToken" VARCHAR,
    "verfiyPasswordTokenExpiry" BIGINT,
    "verifyToken" VARCHAR,
    "verifyTokenExpiry" BIGINT,
    "bookMarkedNumbers" BIGINT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

