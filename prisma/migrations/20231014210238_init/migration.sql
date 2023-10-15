/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `size` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Groups" (
    "groupName" TEXT NOT NULL PRIMARY KEY,
    "size" INTEGER NOT NULL
);
INSERT INTO "new_Groups" ("groupName") SELECT "groupName" FROM "Groups";
DROP TABLE "Groups";
ALTER TABLE "new_Groups" RENAME TO "Groups";
CREATE UNIQUE INDEX "Groups_groupName_key" ON "Groups"("groupName");
CREATE TABLE "new_Expenses" (
    "expenseId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expense" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupName" TEXT NOT NULL,
    CONSTRAINT "Expenses_groupName_fkey" FOREIGN KEY ("groupName") REFERENCES "Groups" ("groupName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Expenses" ("dateTime", "description", "expense", "expenseId", "groupName") SELECT "dateTime", "description", "expense", "expenseId", "groupName" FROM "Expenses";
DROP TABLE "Expenses";
ALTER TABLE "new_Expenses" RENAME TO "Expenses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
