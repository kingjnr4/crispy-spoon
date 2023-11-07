-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "balance" DECIMAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "_account_number_key" ON "users"("account_number");
