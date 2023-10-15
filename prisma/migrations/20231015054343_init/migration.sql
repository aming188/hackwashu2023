/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "firstName", "lastName", "password") SELECT "email", "firstName", "lastName", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new__GroupsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GroupsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Groups" ("groupName") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GroupsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GroupsToUser" ("A", "B") SELECT "A", "B" FROM "_GroupsToUser";
DROP TABLE "_GroupsToUser";
ALTER TABLE "new__GroupsToUser" RENAME TO "_GroupsToUser";
CREATE UNIQUE INDEX "_GroupsToUser_AB_unique" ON "_GroupsToUser"("A", "B");
CREATE INDEX "_GroupsToUser_B_index" ON "_GroupsToUser"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
